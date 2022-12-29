package com.jinkyumpark.bookitout.security.authorization;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AppUserPermission {
    BOOK_READ("book:read"),
    BOOK_WRITE("book:write");

    private final String permission;
}
