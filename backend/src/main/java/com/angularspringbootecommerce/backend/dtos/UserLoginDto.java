package com.angularspringbootecommerce.backend.dtos;

import com.angularspringbootecommerce.backend.models.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
public class UserLoginDto {

    @Setter
    private Long id;
    private User user;
    private String jwt;
    private String role;

    public UserLoginDto(Long id, User user, String jwt, String role) {
        this.id = id;
        this.user = user;
        this.jwt = jwt;
        this.role = role;
    }

}