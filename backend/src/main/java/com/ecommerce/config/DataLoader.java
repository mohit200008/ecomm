package com.ecommerce.config;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }

        productRepository.save(new Product(
                null,
                "Sample speaker",
                "Bluetooth speaker (seed row).",
                new BigDecimal("2999.00"),
                "https://placehold.co/400x400/png?text=Product+1"));
        productRepository.save(new Product(
                null,
                "Sample headphones",
                "Over-ear headphones (seed row).",
                new BigDecimal("4999.00"),
                "https://placehold.co/400x400/png?text=Product+2"));
    }
}
