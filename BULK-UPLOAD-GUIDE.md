# Bulk Product Upload Guide

## Overview
Admin panel mein ab aap CSV file upload karke multiple products ek saath add kar sakte ho.

## How to Use

### Step 1: Admin Panel Access
1. Admin panel login karo: `/admin/login`
2. Products page par jao: `/admin/products`

### Step 2: Bulk Upload Button
1. "Bulk Upload" button par click karo
2. Upload section open hoga

### Step 3: CSV File Upload
1. "Choose CSV File" button par click karo
2. Apni CSV file select karo
3. File automatically upload hogi aur products add ho jayenge

## CSV File Format

### Required Columns:
```
name,price,mrp,category,sku,description,instock,rating,stockcount,quickdelivery
```

### Column Details:
- **name** (required): Product ka naam
- **price** (required): Selling price (number)
- **mrp**: Maximum Retail Price (number)
- **category**: Product category (MicroController, Sensor, Motor Driver, etc.)
- **sku**: Stock Keeping Unit code
- **description**: Product description
- **instock**: Stock available hai ya nahi (true/false)
- **rating**: Product rating (0-5)
- **stockcount**: Kitne items stock mein hain (number)
- **quickdelivery**: Quick delivery available hai (true/false)

### Example CSV:
```csv
name,price,mrp,category,sku,description,instock,rating,stockcount,quickdelivery
ESP32 Devkit V1,350,499,MicroController,A5X-MC-001,Dual-core board,true,4.8,45,true
Arduino Uno R3,300,450,MicroController,A5X-MC-002,Beginner board,true,4.6,60,true
L298N Motor Driver,85,149,Motor Driver,A5X-MD-001,Dual H-Bridge,true,4.8,150,true
```

## Sample File
`sample-products.csv` file project mein included hai - isko reference ke liye use kar sakte ho.

## Features
✅ Multiple products ek saath upload
✅ CSV format support
✅ Automatic product ID generation
✅ Success/Error messages
✅ Upload progress indicator
✅ Dark theme UI

## Notes
- Sirf CSV files (.csv, .txt) supported hain
- Kam se kam `name` aur `price` columns required hain
- Invalid rows skip ho jayenge
- Upload ke baad products turant shop page par show honge

## Troubleshooting
- **No products added**: Check karein ki CSV format sahi hai
- **Some products missing**: Invalid rows skip ho gaye honge
- **Error message**: File format ya data check karein

## Support
Koi problem ho toh admin panel ke Settings section mein contact details hain.
