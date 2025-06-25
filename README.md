# 🛍️ RetailOS

**RetailOS** is a mobile-first **Point of Sale (POS)** and **inventory tracking** application tailored for small businesses. Built with **React Native** and styled with **Tailwind CSS**, it simplifies day-to-day retail operations including inventory control, product checkout, and group billing.

---

## 📱 Features

- 💼 **Mobile POS System**  
  Intuitive sales interface for quick checkout, product scanning, and order processing.

- 📦 **Inventory Management**  
  Add, edit, and track product quantities, categories, and pricing in real time.

- 👥 **Group Billing**  
  Split bills among multiple customers in one transaction session.

- 📊 **Sales Overview (Optional)**  
  Daily/weekly summaries for monitoring revenue and performance.

- 🌐 **Offline-First Design (Planned)**  
  Ensures POS functionality even with unstable internet connections.

---

## ⚙️ Tech Stack

| Layer        | Tech Stack                     |
|--------------|--------------------------------|
| Framework    | React Native (Expo)            |
| Styling      | Tailwind CSS (via NativeWind)  |
| State Mgmt   | useContext / Redux (if used)   |
| Navigation   | React Navigation               |
| Storage      | AsyncStorage / API integration |
| Icons        | React Native Vector Icons      |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/retailos.git
cd retailos
# Clone the api
git clone https://github.com/issahben/inventoryapi.git
cd inventoryapi

# Install dependencies
bundle install

# Setup DB
rails db:create db:migrate

