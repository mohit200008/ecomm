package com.ecommerce.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.model.Product;

@Service
public class ProductService {

    /**
     * Mock catalog until DB + JPA (Phase 4).
     */
    public List<Product> findAll() {
        return List.of(
                new Product(
                        1L,
                        "Sample speaker",
                        "Bluetooth speaker, mock data from backend.",
                        new BigDecimal("2999.00"),
                        "https://placehold.co/400x400/png?text=Product+1"),
                new Product(
                        2L,
                        "Sample headphones",
                        "Over-ear headphones, mock data from backend.",
                        new BigDecimal("4999.00"),
                        "https://placehold.co/400x400/png?text=Product+2"));
    }
}
