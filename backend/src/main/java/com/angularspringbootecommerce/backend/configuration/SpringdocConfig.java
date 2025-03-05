package com.angularspringbootecommerce.backend.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "Ecommerce API", version = "1.0", description = "API documentation for Ecommerce"),
        security = @SecurityRequirement(name = "BearerAuth")  // 🔹 Add global security requirement
)
@SecurityScheme(
        name = "BearerAuth",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT" // 🔹 Indicate it's a JWT token
)
public class SpringdocConfig {
}
