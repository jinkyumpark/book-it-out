package com.jinkyumpark.bookitout.app.quotation.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class QuotationAddRequest {
    @NotNull
    private Integer page;

    @NotNull
    @NotBlank
    private String content;

    private String fromWho;
}
