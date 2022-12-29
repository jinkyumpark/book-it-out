package com.jinkyumpark.bookitout.app.memo.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class MemoAddRequest {
    @NotNull
    private Integer page;

    @NotNull
    @NotBlank
    private String content;
}
