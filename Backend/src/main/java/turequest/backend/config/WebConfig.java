package turequest.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/profile/**").allowedOrigins("http://localhost:3000");
                registry.addMapping("/fileserver/**").allowedOrigins("http://localhost:3000");
                registry.addMapping("/submit-request/**")
                        .allowedOrigins("http://localhost:3000");


            }
        };
    }
}
