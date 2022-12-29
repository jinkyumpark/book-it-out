package com.jinkyumpark.bookitout.app.book.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BookEditRequest {
    private String title;
    private String author;
    private String language;
    private String category;
    private Integer endPage;
    private String cover;
    private String source;
    private Boolean isSharing;
    private Integer rating;

    private String summary;
    private String review;
}
