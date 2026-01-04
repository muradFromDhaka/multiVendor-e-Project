package com.abc.SpringSecurityExample.Controller;

import com.abc.SpringSecurityExample.DTOs.projectDtos.VendorRequestDto;
import com.abc.SpringSecurityExample.DTOs.projectDtos.VendorResponseDto;
import com.abc.SpringSecurityExample.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    // ---------------- CREATE ----------------
    @PostMapping
    public ResponseEntity<VendorResponseDto> createVendor(@RequestBody VendorRequestDto dto) {
        VendorResponseDto response = vendorService.createVendor(dto);
        return ResponseEntity.ok(response);
    }

    // ---------------- GET ALL (Admin) ----------------
    @GetMapping
    public ResponseEntity<List<VendorResponseDto>> getAllVendors() {
        List<VendorResponseDto> vendors = vendorService.getAllVendors();
        return ResponseEntity.ok(vendors);
    }

    // ---------------- GET BY ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<VendorResponseDto> getVendorById(@PathVariable Long id) {
        VendorResponseDto dto = vendorService.getVendorById(id);
        return ResponseEntity.ok(dto);
    }

    // ---------------- UPDATE ----------------
    @PutMapping("/{id}")
    public ResponseEntity<VendorResponseDto> updateVendor(@PathVariable Long id,
                                                          @RequestBody VendorRequestDto dto) {
        VendorResponseDto response = vendorService.updateVendor(id, dto);
        return ResponseEntity.ok(response);
    }

    // ---------------- DELETE ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }

    // ---------------- GET LOGGED-IN USER VENDOR ----------------
    @GetMapping("/me")
    public ResponseEntity<VendorResponseDto> getMyVendor() {
        VendorResponseDto dto = vendorService.getMyVendor();
        return ResponseEntity.ok(dto);
    }
}
