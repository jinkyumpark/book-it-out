package com.jinkyumpark.bookitout.app.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.book.model.Book;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name = "app_user", uniqueConstraints = {
        @UniqueConstraint(name = "app_user_email_unique", columnNames = "email")
})
public class AppUser implements UserDetails {
    @Id
    @SequenceGenerator(name = "app_user_seq", sequenceName = "app_user_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_user_seq")
    @Column(name = "app_user_id")
    private Long appUserId;

    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email_verification_code")
    @JsonIgnore
    private Integer emailVerificationCode;

    @Column(name = "register_date")
    @CreationTimestamp
    @JsonIgnore
    private LocalDateTime registerDate;

    @OneToMany(mappedBy = "appUser", cascade = { CascadeType.REMOVE }, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Book> bookList;

    // Constructors
    @Builder
    public AppUser(Long appUserId, String email, String password) {
        this.appUserId = appUserId;
        this.email = email;
        this.password = password;
    }

    @Builder
    public AppUser(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    @Builder
    public AppUser(String email, Integer emailVerificationCode) {
        this.email = email;
        this.emailVerificationCode = emailVerificationCode;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public AppUser(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public AppUser(Long appUserId) {
        this.appUserId = appUserId;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
}