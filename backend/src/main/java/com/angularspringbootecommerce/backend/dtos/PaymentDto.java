package com.angularspringbootecommerce.backend.dtos;

import lombok.Data;
import java.math.BigDecimal;
import org.json.JSONObject;

@Data
public class PaymentDto {
    private BigDecimal amount;
    private String currency;
    private String receipt;

    public PaymentDto(BigDecimal amount, String currency, String receipt) {
        this.amount = amount;
        this.currency = currency;
        this.receipt = receipt;
    }

    public JSONObject toJson() {
        JSONObject options = new JSONObject();
        options.put("amount", amount.multiply(new BigDecimal("100"))); // Amount in paisa
        options.put("currency", currency);
        options.put("receipt", receipt);
        return options;
    }
}
