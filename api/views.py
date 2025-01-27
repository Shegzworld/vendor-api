from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import requests
from .models import Wallet, Transaction, Customer, Supplement, Article, Podcast,Health_Condition
from .serializers import (
    WalletSerializer, TransactionSerializer, CustomerSerializer,
    SupplementSerializer, ArticleSerializer, PodcastSerializer,HealthConditionSerializer
)

from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate

class CustomerCreateView(APIView):
    """
    API view to create a new customer.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data

        # Check if the username already exists
        if User.objects.filter(username=data['username']).exists():
            return Response({'error': 'Username already exists. Please choose another one.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create the user if username is unique
            user = User.objects.create_user(
                username=data['username'],
                password=data['password'],  # You may want to handle the password field as well
            )
            customer = Customer.objects.create(
                user=user,
                name=data['name'],
                phone=data['phone'],
                role=data.get('role', 'benfek'),  # Default role is 'benfek'
                address=data['address']
            )
            return Response({'message': 'Customer created successfully', 'customer_id': customer.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
class UserLoginView(APIView):
    """
    API view for user login and token generation.
    """
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        data = request.data
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = WalletSerializer

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def initialize_payment(self, request, pk=None):
        amount = request.data.get('amount')
        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
            'Content-Type': 'application/json',
        }
        
        data = {
            'email': request.user.email,
            'amount': float(amount) * 100,  # Convert to kobo
            'callback_url': 'http://localhost:5173/payment/callback'
        }

        response = requests.post(
            'https://api.paystack.co/transaction/initialize',
            json=data,
            headers=headers
        )

        if response.status_code == 200:
            return Response(response.json())
        return Response(
            {'error': 'Payment initialization failed'},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['post'])
    def verify_payment(self, request, pk=None):
        reference = request.data.get('reference')
        if not reference:
            return Response({'error': 'Reference is required'}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
        }

        response = requests.get(
            f'https://api.paystack.co/transaction/verify/{reference}',
            headers=headers
        )

        if response.status_code == 200:
            response_data = response.json()
            if response_data['data']['status'] == 'success':
                # Update wallet balance
                wallet = self.get_object()
                amount = float(response_data['data']['amount']) / 100  # Convert from kobo
                wallet.balance += amount
                wallet.save()

                # Create transaction record
                Transaction.objects.create(
                    wallet=wallet,
                    amount=amount,
                    transaction_type='deposit',
                    status='completed',
                    reference=reference
                )

                return Response({'message': 'Payment verified successfully'})
        return Response(
            {'error': 'Payment verification failed'},
            status=status.HTTP_400_BAD_REQUEST
        )

class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(wallet__user=self.request.user)

class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer

    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SupplementViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SupplementSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        user = request.user  # Extract the authenticated user from the token
        serializer = SupplementSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)  # Associate the supplement with the user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return Supplement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ArticleViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PodcastViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PodcastSerializer

    def get_queryset(self):
        return Podcast.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HealthConditionViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, creating, updating, and deleting health conditions.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = HealthConditionSerializer

    def get_queryset(self):
        # Restrict access to only the authenticated user's health conditions
        return Health_Condition.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically associate the health condition with the authenticated user
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def by_code(self, request):
        code = request.query_params.get('code')
        if not code:
            return Response({'error': 'Code parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        health_condition = Health_Condition.objects.filter(code=code, user=request.user).first()
        if health_condition:
            serializer = self.get_serializer(health_condition)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Health condition not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def by_id(self, request, pk=None):
        health_condition = self.get_object()
        serializer = self.get_serializer(health_condition)
        return Response(serializer.data)