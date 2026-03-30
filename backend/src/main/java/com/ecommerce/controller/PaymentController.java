package com.ecommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.dto.CheckoutItemDto;
import com.ecommerce.dto.CreateSessionResponse;
import com.ecommerce.service.StripePaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final StripePaymentService stripePaymentService;

    public PaymentController(StripePaymentService stripePaymentService) {
        this.stripePaymentService = stripePaymentService;
    }

    @PostMapping("/create-session")
    @ResponseStatus(HttpStatus.OK)
    public CreateSessionResponse createSession(@RequestBody List<CheckoutItemDto> items, HttpServletRequest request)
            throws StripeException {

        String origin = request.getHeader("Origin");
        if (origin == null || origin.isBlank()) {
            origin = "http://localhost:3000";
        }

        String successUrl = origin + "/success";
        String cancelUrl = origin + "/canceled";

        Session session = stripePaymentService.createCheckoutSession(items, successUrl, cancelUrl);
        return new CreateSessionResponse(session.getId());
    }
}
