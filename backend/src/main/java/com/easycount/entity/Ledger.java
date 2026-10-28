package com.easycount.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ledgers")
@Getter
@Setter
@NoArgsConstructor
public class Ledger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "area", nullable = false)
    private String area;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;
    public void setName(String name) {
        this.name = name;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getName() {
        return name;
    }
    public String getPhone() {
        return phone;
    }
    public String getArea() {
        return area;
    }
    public String getAddress() {
        return address;
    }
}