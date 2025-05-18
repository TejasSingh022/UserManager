package com.usermanager.crud.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.usermanager.crud.model.User;

import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAllUsers() {
        return jdbcTemplate.query("SELECT * FROM USERS", new BeanPropertyRowMapper<>(User.class));
    }

    public User findByEmail(String email) {
        List<User> users = jdbcTemplate.query(
            "SELECT * FROM USERS WHERE EMAIL = ?",
            new BeanPropertyRowMapper<>(User.class),
            email
        );
        return users.isEmpty() ? null : users.get(0);
    }

    public void createUser(String name, String email, String phone) {
        jdbcTemplate.update(
            "INSERT INTO USERS (NAME, EMAIL, PHONE) VALUES (?, ?, ?)",
            name, email, phone
        );
    }

    public void updateUser(Integer id, String name, String email, String phone) {
        jdbcTemplate.update(
            "UPDATE USERS SET NAME = ?, EMAIL = ?, PHONE = ? WHERE ID = ?",
            name, email, phone, id
        );
    }

    public void deleteUser(Integer id) {
        jdbcTemplate.update("DELETE FROM USERS WHERE ID = ?", id);
    }
}
