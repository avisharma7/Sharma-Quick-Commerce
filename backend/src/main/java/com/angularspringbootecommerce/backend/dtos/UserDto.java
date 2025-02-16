package com.angularspringbootecommerce.backend.dtos;

import lombok.Getter;
import lombok.Setter;

public class UserDto {

    @Getter
    @Setter
    private String email;
    @Setter
    @Getter
    private String password;

    @Getter
    @Setter
    private String role;

    public UserDto() {
        super();
    }

    public UserDto(String email, String password, String role) {
        super();
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
