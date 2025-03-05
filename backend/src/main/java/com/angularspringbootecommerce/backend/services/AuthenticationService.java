package com.angularspringbootecommerce.backend.services;

import com.angularspringbootecommerce.backend.dtos.UserLoginDto;
import com.angularspringbootecommerce.backend.models.User;
import com.angularspringbootecommerce.backend.models.UserRole;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;
import com.angularspringbootecommerce.backend.repository.UserRepository;
import com.angularspringbootecommerce.backend.repository.UserRoleRepository;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public User register(String email, String password, String role) {
        String encodedPassword = passwordEncoder.encode(password);

        // Find role in database, or throw error if not found
        UserRole userRole = userRoleRepository.findByAuthority(role.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Role '" + role.toUpperCase() + "' not found in the database"));


        Set<UserRole> authorities = new HashSet<>();

        authorities.add(userRole);

        return userRepository.save(new User(email, encodedPassword, authorities));
    }

    public UserLoginDto login(String email, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            String token = tokenService.generateJwt(auth);

            System.out.println("login function is called");

            User user = userRepository.findByEmail(email).orElse(null);
            System.out.println(user);
            if (user != null) {
                System.out.println("User"+ user);
                // Extract role from the user's authorities
                String role = user.getAuthorities().stream()
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("buyer"); // Default role if not found

                System.out.println("role k ho ?:"+role);

                return new UserLoginDto(user.getId(), user, token, role);
            } else {
                return new UserLoginDto(null, null, null, "");
            }

        } catch (AuthenticationException e) {
            return new UserLoginDto(null, null,null, "");
        }
    }
}
