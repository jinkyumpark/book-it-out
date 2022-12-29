package com.jinkyumpark.bookitout.app.book.request;

import com.jinkyumpark.bookitout.app.book.model.BookSource;
import com.jinkyumpark.bookitout.app.book.model.BookForm;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
public class BookAddRequest {
    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private String  author;

    private String cover;
    private LocalDateTime publishedAt;
    private String language;
    private String form = BookForm.PHYSICAL.toString();
    private String source = BookSource.NOT_PROVIDED.toString();
    @NotNull
    private Integer endPage;

    private Boolean isSharing = false;
    private String category;
}