package com.usermanager.crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.usermanager.crud.model.User;
import com.usermanager.crud.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAllUsers();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User createUser(User user) {
        userRepository.createUser(user.getName(), user.getEmail(), user.getPhone());
        return userRepository.findByEmail(user.getEmail());
    }

    @Transactional
    public void updateUser(User user) {
        userRepository.updateUser(user.getId(), user.getName(), user.getEmail(), user.getPhone());
    }

    @Transactional
    public void deleteUser(Integer id) {
        userRepository.deleteUser(id);
    }
}
