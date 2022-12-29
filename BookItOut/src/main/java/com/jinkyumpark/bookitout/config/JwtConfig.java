package com.jinkyumpark.bookitout.config;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import com.google.common.net.HttpHeaders;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Getter @Setter

@Component
@ConfigurationProperties(prefix = "application.jwt")
public class JwtConfig {
    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpirationAfterDays;
    private Integer tokenExpirationAfterDaysStayLogin;

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }
}