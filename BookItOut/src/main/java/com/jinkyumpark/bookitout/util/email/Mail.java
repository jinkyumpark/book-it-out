package com.jinkyumpark.bookitout.util.email;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
public class Mail {
    private String fromAddress;
    private String toAddress;
    private String subject;
    private String content;

    @Builder
    public Mail(String toAddress, String subject, String content) {
        this.toAddress = toAddress;
        this.subject = subject;
        this.content = content;
    }
}
