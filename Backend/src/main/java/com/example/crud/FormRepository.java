package com.example.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.stereotype.Service;
public interface FormRepository extends JpaRepository<Form, Long> {
    // You can add custom query methods if needed
    List<Form> findByStudentId(String studentId);
}