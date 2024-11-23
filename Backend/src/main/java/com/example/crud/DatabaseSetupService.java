package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class DatabaseSetupService {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void initializeDatabase() {
        String sql = """
            ALTER TABLE request ALTER COLUMN date NVARCHAR(20);
            ALTER TABLE request ALTER COLUMN prefix NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN full_name NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN student_id NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN department NVARCHAR(40);
            ALTER TABLE request ALTER COLUMN email NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN address NVARCHAR(30);
            ALTER TABLE request ALTER COLUMN subdistrict NVARCHAR(40);
            ALTER TABLE request ALTER COLUMN district NVARCHAR(40);
            ALTER TABLE request ALTER COLUMN province NVARCHAR(40);
            ALTER TABLE request ALTER COLUMN student_phone NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN parent_phone NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN advisor NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN request_type NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN semester NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN academic_year NVARCHAR(15);
            ALTER TABLE request ALTER COLUMN course_code NVARCHAR(20);
            ALTER TABLE request ALTER COLUMN course_name NVARCHAR(30);
            ALTER TABLE request ALTER COLUMN section NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN reason NVARCHAR(100);
            ALTER TABLE request ALTER COLUMN status NVARCHAR(25);
            """;

        jdbcTemplate.execute(sql);
    }
}
