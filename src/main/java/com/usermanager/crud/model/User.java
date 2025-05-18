package com.usermanager.crud.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("USERS")
public class User {
    @Id
    private Integer id;
    private String name;
    private String email;
    private String phone;
}