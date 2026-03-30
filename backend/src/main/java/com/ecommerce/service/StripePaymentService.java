package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ecommerce.dto.CheckoutItemDto;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripePaymentService {

    public StripePaymentService(@Value("${stripe.secret.key}") String stripeSecretKey) {
        if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
            throw new IllegalStateException("Missing STRIPE_SECRET_KEY (set stripe.secret.key)");
        }
        Stripe.apiKey = stripeSecretKey;
    }

    public Session createCheckoutSession(List<CheckoutItemDto> items, String successUrl, String cancelUrl)
            throws StripeException {

        SessionCreateParams.Builder params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSubmitType(SessionCreateParams.SubmitType.PAY)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.AUTO)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD);

        for (CheckoutItemDto item : items) {
            if (item.getQuantity() == null || item.getQuantity() < 1) {
                continue;
            }

            SessionCreateParams.LineItem.PriceData.ProductData.Builder productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName(item.getName());

            if (item.getImageUrl() != null && !item.getImageUrl().isBlank()) {
                productData.addImage(item.getImageUrl());
            }

            long unitAmount = item.getPrice().movePointRight(2).longValue();

            SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                    .setCurrency("inr")
                    .setUnitAmount(unitAmount)
                    .setProductData(productData.build())
                    .build();

            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setQuantity(item.getQuantity().longValue())
                    .setPriceData(priceData)
                    .build();

            params.addLineItem(lineItem);
        }

        return Session.create(params.build());
    }
}
