import React, { useState, useMemo, useEffect } from "react";
import {
  ShieldAlert,
  ChevronRight,
  Activity,
  Syringe,
  ShieldCheck,
  Search,
  Menu,
  X,
  ChevronLeft,
  Sun,
  Moon,
  Info,
} from "lucide-react";

// Comprehensive Data Extraction from Antibiogram 2024 Document
const antibiogramData = {
  OP: {
    Urine: {
      "Enterococcus spp": {
        Linezolid: 84,
        Vancomycin: 80,
        Nitrofurantoin: 80,
        Doxycycline: 80,
        "Piperacillin + Tazobactam": 72,
        Fosfomycin: 64,
        Teicoplanin: 60,
        Ampicillin: 56,
        Penicillin: 48,
        Tetracycline: 28,
        Ciprofloxacin: 28,
        Levofloxacin: 24,
      },
      "Escherichia coli": {
        Nitrofurantoin: 91.4,
        Ertapenem: 86.6,
        Amikacin: 77.3,
        "Piperacillin + Tazobactam": 75,
        Meropenem: 73.8,
        Imipenem: 73.8,
        Gentamycin: 73.8,
        "Cefoperazone + Sulbactam": 67.3,
        Fosfomycin: 66.4,
        Tetracycline: 61.3,
        "Amoxicillin/Clavulanic Acid": 49.7,
        Cefepime: 37.8,
        Levofloxacin: 28.9,
        "Co-trimoxazole": 27.8,
        Ceftriaxone: 27.8,
        Cefixime: 20.7,
        Cefuroxime: 20.7,
      },
      "Klebsiella spp": {
        Ertapenem: 66.6,
        Imipenem: 66.6,
        Meropenem: 66.6,
        "Piperacillin + Tazobactam": 66.6,
        Tetracycline: 66.6,
        "Cefoperazone + Sulbactam": 57.6,
        "Co-trimoxazole": 57.6,
        "Amoxicillin/Clavulanic Acid": 50,
        Ciprofloxacin: 42.3,
        Ceftriaxone: 42.3,
        Cefepime: 38.4,
        Cefixime: 32.05,
        Amikacin: 25.6,
        Nitrofurantoin: 25.6,
        Gentamycin: 25.6,
        Levofloxacin: 25.6,
        Cefuroxime: 23,
      },
      "Pseudomonas spp": {},
      "Proteus spp": {},
      "Enterobacter spp": {},
      "Citrobacter spp": {},
      "Staphylococcus aureus": {},
      "Morganella morganii": {},
      "Streptococcus spp": {},
      "Acinetobacter Baumanii": {},
      "Burkholderia cepacia": {},
      "Coagulase-negative Staphylococcus spp": {},
      "Non fermenting gram-negative bacilli": {},
      "Salmonella Typhi": {},
      "Sphingomonas paucimobilis": {},
      "Staphylococcus saprophyticus": {},
    },
    "BAL Fluid": {
      "Pseudomonas spp": {
        Ciprofloxacin: 100,
        Levofloxacin: 100,
        Tobramycin: 100,
        Cefepime: 100,
        Ceftazidime: 88.8,
        Imipenem: 100,
        Meropenem: 100,
        Aztreonam: 100,
        "Piperacillin + Tazobactam": 100,
      },
      "Hemophilus spp": {
        "Amoxicillin/Clavulanic Acid": 100,
        Meropenem: 100,
        Azithromycin: 100,
        "Co-trimoxazole": 100,
        Ciprofloxacin: 83.3,
        Levofloxacin: 83.3,
        Cefixime: 83.3,
        Imipenem: 66.6,
        "Ampicillin + Sulbactam": 50,
        Cefuroxime: 33.3,
        Tetracycline: 33.3,
        Aztreonam: 33.3,
      },
      "Escherichia coli": {},
      "Klebsiella spp": {},
      "Acinetobacter Spp": {},
      "Streptococcus Spp": {},
    },
    "ET Secretions": {
      "Acinetobacter Spp": {
        Tigecycline: 100,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        Ceftriaxone: 0,
        Cefepime: 0,
        Gentamycin: 0,
        Amikacin: 0,
        Imipenem: 0,
        Meropenem: 0,
        Tetracycline: 0,
        Doxycycline: 0,
        "Piperacillin + Tazobactam": 0,
        "Cefoperazone + Sulbactam": 0,
        "Ampicillin + Sulbactam": 0,
        Ceftazidime: 0,
      },
      "Pseudomonas Spp": {
        Aztreonam: 100,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        Tobramycin: 0,
        Cefepime: 0,
        Ceftazidime: 0,
        Imipenem: 0,
        Meropenem: 0,
        "Piperacillin + Tazobactam": 0,
      },
    },
    Sputum: {
      "Streptococcus Spp": {
        Linezolid: 100,
        Vancomycin: 100,
        Tetracycline: 80,
        Doxycycline: 80,
        "Co-trimoxazole": 80,
        Clindamycin: 40,
        Levofloxacin: 40,
        Azithromycin: 0,
        Erythromycin: 0,
      },
      "Hemophilus Spp": {},
      "Pseudomonas Spp": {},
      "Klebsiella spp": {},
      "Acinetobacter Spp": {},
      "Moraxella Spp": {},
      "Staphylococcus Spp": {},
    },
    Pus: {
      "Escherichia Coli": {
        Amikacin: 88.2,
        "Co-trimoxazole": 82.3,
        "Cefoperazone + Sulbactam": 67.6,
        Cefixime: 58.8,
        "Amoxicillin/Clavulanic Acid": 23.5,
        Ciprofloxacin: 20.5,
        Cefepime: 11.7,
        Cefuroxime: 5.8,
      },
      "Staphylococcus Spp": {},
      "Klebsiella spp": {},
      "Pseudomonas Spp": {},
      "Proteus Spp": {},
      "Streptococcus Spp": {},
      "Enterococcus spp": {},
      "Hemophilus Spp": {},
      "Enterobacter Spp": {},
      "Providencia Spp": {},
      "Coagulase Negative Staphylococcus Spp": {},
      "Acinetobacter Spp": {},
      "Morgonella spp": {},
      "Candida Spp": {},
    },
    "Ascitic Fluid": {
      "Klebsiella spp": {
        Ciprofloxacin: 100,
        Levofloxacin: 100,
        "Co-trimoxazole": 100,
        Ceftriaxone: 100,
        Cefepime: 100,
        Tigecycline: 100,
        Gentamycin: 100,
        Amikacin: 100,
        Tetracycline: 100,
        "Piperacillin + Tazobactam": 100,
        "Cefoperazone + Sulbactam": 100,
        Cefuroxime: 0,
        "Amoxicillin/Clavulanic Acid": 0,
        Imipenem: 0,
        Meropenem: 0,
      },
      "Escherichia coli": {
        Ciprofloxacin: 100,
        "Co-trimoxazole": 100,
        Cefuroxime: 100,
        "Amoxicillin/Clavulanic Acid": 100,
        Ceftriaxone: 100,
        Cefepime: 100,
        Tigecycline: 100,
        Gentamycin: 100,
        Amikacin: 100,
        Imipenem: 100,
        Meropenem: 100,
        "Cefoperazone + Sulbactam": 100,
      },
      "Stenotrophomonas Maltophilia": {},
    },
    Tissue: {
      "Escherichia coli": {
        Tigecycline: 100,
        Gentamycin: 100,
        "Co-trimoxazole": 50,
        Amikacin: 50,
        Imipenem: 50,
        Meropenem: 50,
        Tetracycline: 50,
        "Cefoperazone + Sulbactam": 50,
        Ciprofloxacin: 0,
        Cefuroxime: 0,
        "Amoxicillin/Clavulanic Acid": 0,
        Ceftriaxone: 0,
        Cefepime: 0,
        Doxycycline: 0,
        "Piperacillin + Tazobactam": 0,
      },
      "Staphylococcus Spp": {
        Oxacillin: 100,
        Linezolid: 100,
        Daptomycin: 100,
        Levofloxacin: 50,
        Gentamycin: 50,
        Vancomycin: 50,
        Erythromycin: 50,
        Clindamycin: 50,
        Ciprofloxacin: 0,
        "Benzyl Penicillin": 0,
      },
      "Klebsiella spp": {},
      "Proteus Spp": {},
      "Streptococcus Spp": {},
    },
    Tip: {
      "Escherichia coli": {
        Tigecycline: 100,
        Gentamycin: 100,
        Imipenem: 100,
        Meropenem: 100,
        Doxycycline: 100,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        "Co-trimoxazole": 0,
        Cefuroxime: 0,
        "Amoxicillin/Clavulanic Acid": 0,
        Ceftriaxone: 0,
        Cefepime: 0,
        Amikacin: 0,
        "Piperacillin + Tazobactam": 0,
        "Cefoperazone + Sulbactam": 0,
      },
      "Klebsiella spp": {
        Tigecycline: 100,
        Gentamycin: 100,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        "Co-trimoxazole": 0,
        Cefuroxime: 0,
        "Amoxicillin/Clavulanic Acid": 0,
        Ceftriaxone: 0,
        Cefepime: 0,
        Amikacin: 0,
        Imipenem: 0,
        Meropenem: 0,
        Doxycycline: 0,
        "Piperacillin + Tazobactam": 0,
        "Cefoperazone + Sulbactam": 0,
      },
      "Staphylococcus Spp": {
        Gentamycin: 100,
        Teicoplanin: 100,
        Tetracycline: 100,
        "Co-trimoxazole": 100,
        Daptomycin: 100,
        Tigecycline: 100,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        Oxacillin: 0,
        Linezolid: 0,
        Vancomycin: 0,
        Erythromycin: 0,
      },
      "Candida Spp": {},
    },
    "Synovial Fluid": {
      "Enterobacter cloacae complex": {
        "Co-trimoxazole": 100,
        Tigecycline: 100,
        Gentamycin: 100,
        Ciprofloxacin: 0,
        Cefuroxime: 0,
        "Amoxicillin/Clavulanic Acid": 0,
        Ceftriaxone: 0,
        Cefepime: 0,
        Amikacin: 0,
        Imipenem: 0,
        Meropenem: 0,
        "Piperacillin + Tazobactam": 0,
        "Cefoperazone + Sulbactam": 0,
        Levofloxacin: 0,
        Tetracycline: 0,
        Doxycycline: 0,
      },
    },
    "Pleural Fluid": {
      "Streptococcus pneumoniae": {
        Clindamycin: 100,
        Levofloxacin: 100,
        Linezolid: 100,
        Vancomycin: 100,
        Tetracycline: 100,
        "Co-trimoxazole": 100,
        Erythromycin: 0,
      },
    },
    "Peritoneal Fluid": {
      "Klebsiella spp": {
        Doxycycline: 100,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        "Co-trimoxazole": 0,
        Cefepime: 0,
        Imipenem: 0,
        Meropenem: 0,
        "Piperacillin + Tazobactam": 0,
        "Cefoperazone + Sulbactam": 0,
      },
      "Pseudomonas Spp": {
        Ciprofloxacin: 100,
        Levofloxacin: 100,
        Cefepime: 100,
        Imipenem: 100,
        "Piperacillin + Tazobactam": 100,
        Meropenem: 0,
        "Amoxicillin/Clavulanic Acid": 0,
        Amikacin: 0,
      },
      "Enterococcus Spp": {
        Linezolid: 100,
        Tigecycline: 100,
        Teicoplanin: 100,
        Vancomycin: 100,
        Tetracycline: 0,
      },
    },
    "Nasal Swab": {
      "Staphylococcus aureus": {
        "Amoxicillin/Clavulanic Acid": 100,
        Ceftriaxone: 100,
        Linezolid: 100,
        Vancomycin: 100,
        Tigecycline: 100,
        Levofloxacin: 0,
        Gentamycin: 0,
        Cefazolin: 0,
      },
      "Pseudomonas aeruginosa": {},
      "Streptococcus pneumoniae": {},
      "Klebsiella pneumoniae": {},
    },
    Wound: {
      "Staphylococcus Spp": {
        Linezolid: 100,
        Tetracycline: 100,
        Teicoplanin: 91.6,
        Vancomycin: 83.3,
        Daptomycin: 83.3,
        Oxacillin: 80.5,
        Tigecycline: 75,
        Gentamycin: 66.6,
        "Co-trimoxazole": 66.6,
        Clindamycin: 61.1,
        Erythromycin: 44.4,
        Levofloxacin: 33.3,
        Penicillin: 27.7,
        Ciprofloxacin: 16.6,
      },
      "Klebsiella spp": {
        Tigecycline: 97.2,
        Amikacin: 59.4,
        Doxycycline: 57.1,
        Imipenem: 54.05,
        Meropenem: 52.27,
        Gentamycin: 50,
        Tetracycline: 50,
        "Cefoperazone + Sulbactam": 45.45,
        "Piperacillin + Tazobactam": 39.02,
        "Co-trimoxazole": 37.93,
        Ciprofloxacin: 33.3,
        Levofloxacin: 32.35,
        Cefepime: 31.57,
        Ceftriaxone: 28.2,
        Cefuroxime: 22.2,
        "Amoxicillin/Clavulanic Acid": 19.5,
      },
      "Pseudomonas Spp": {
        Aztreonam: 84.84,
        "Cefoperazone + Sulbactam": 76.47,
        Tobramycin: 74.35,
        "Piperacillin + Tazobactam": 72.5,
        Imipenem: 70,
        Meropenem: 69.23,
        Levofloxacin: 62.16,
        Ciprofloxacin: 57.5,
        Cefepime: 45,
      },
      "Acinetobacter Spp": {},
      "Aeromonas spp": {},
      "Coagulase Negative Staphylococcus": {},
      "Enterobacter Spp": {},
      "Enterococcus Spp": {},
      "Escherichia Coli": {},
      "Granulicatella adiacens": {},
      "Morgonella Spp": {},
      "Proteus Spp": {},
      "Providencia Spp": {},
      "Serratia spp": {},
      "Streptococcus Spp": {},
    },
    Blood: {
      "Escherichia coli": {
        Gentamycin: 87.8,
        Amikacin: 81.8,
        Ertapenem: 75.7,
        Linezolid: 75.7,
        "Cefoperazone + Sulbactam": 72.7,
        Meropenem: 72.7,
        "Piperacillin + Tazobactam": 69.6,
        "Co-trimoxazole": 45.4,
        Doxycycline: 45.4,
        Levofloxacin: 45.4,
        "Amoxicillin/Clavulanic Acid": 39.3,
        Cefepime: 36.3,
        Tetracycline: 36.3,
        Cefuroxime: 27.2,
        Ceftriaxone: 27.2,
        Ciprofloxacin: 18.1,
      },
      "Klebsiella spp": {
        Tigecycline: 95,
        Tetracycline: 85,
        Levofloxacin: 80,
        Amikacin: 50,
        Doxycycline: 50,
        "Co-trimoxazole": 45,
        Gentamycin: 45,
        Ertapenem: 45,
        Imipenem: 45,
        Meropenem: 45,
        Cefepime: 40,
        "Cefoperazone + Sulbactam": 40,
        "Piperacillin + Tazobactam": 40,
        Ciprofloxacin: 35,
        "Amoxicillin/Clavulanic Acid": 30,
        Cefixime: 25,
        Ceftriaxone: 25,
        Cefuroxime: 20,
      },
      "Staphylococcus aureus": {},
      "Streptococcus spp": {},
      "Candida spp": {},
      "Pseudomonas spp": {},
      "Enterococcus spp": {},
      "Achromobacter spp": {},
      "Citrobacter spp": {},
      "Stenotrophomonas Maltophilia": {},
      "Aeromonas spp": {},
      "Burkholderia spp": {},
      "Raoultella spp": {},
      "Salmonella Typhi": {},
      "Sphingomonas spp": {},
      "Acinetobacter spp": {},
      "Comomonas spp": {},
      "Enterobacter spp": {},
      "Pasteurella spp": {},
    },
  },
  IP: {
    Blood: {
      "Escherichia coli": {
        Tigecycline: 97.8,
        Imipenem: 89.3,
        Meropenem: 89.3,
        Gentamycin: 85.1,
        Amikacin: 85.1,
        "Cefoperazone + Sulbactam": 78.7,
        "Piperacillin + Tazobactam": 72.3,
        Tetracycline: 63.8,
        "Co-trimoxazole": 59.5,
        "Amoxicillin/Clavulanic Acid": 46.8,
        Levofloxacin: 19.1,
        Cefuroxime: 17.02,
        Cefepime: 17.02,
        Ceftriaxone: 12.7,
        Ciprofloxacin: 8.51,
      },
      "Klebsiella spp": {
        Tigecycline: 84.7,
        Gentamycin: 56.5,
        Amikacin: 41.3,
        Doxycycline: 39.1,
        "Co-trimoxazole": 36.9,
        Meropenem: 34.7,
        Tetracycline: 34.7,
        "Cefoperazone + Sulbactam": 32.6,
        Imipenem: 30.4,
        "Piperacillin + Tazobactam": 30.4,
        Cefepime: 23.9,
        Cefuroxime: 21.7,
        Ciprofloxacin: 19.5,
        Levofloxacin: 19.5,
        "Amoxicillin/Clavulanic Acid": 17.3,
        Ceftriaxone: 17.3,
      },
      "Staphylococcus spp": {
        Tigecycline: 100,
        Vancomycin: 94.2,
        Daptomycin: 94.2,
        Linezolid: 85.7,
        Tetracycline: 85.7,
        Teicoplanin: 82.8,
        Oxacillin: 71.4,
        Clindamycin: 40,
        Gentamycin: 37.1,
        "Co-trimoxazole": 28.5,
        Ciprofloxacin: 11.4,
        Levofloxacin: 8.5,
        Erythromycin: 8.5,
      },
      "Pseudomonas spp": {},
      "Acinetobacter spp": {},
      "Enterobacter spp": {},
      "Salmonella spp": {},
      "Streptococcus spp": {},
      "Aeromonas spp": {},
      "Achromobacter spp": {},
      "Brevundimonas spp": {},
      "Ralostonia spp": {},
      "Serratia spp": {},
      "Candida spp": {},
      "Burkholderia spp": {},
      "Enterococcus spp": {},
      "Sphingomonas spp": {},
      "Chryseobacterium spp": {},
      "Elizabethkingea spp": {},
    },
    Urine: {
      "Escherichia coli": {
        Fosfomycin: 98.7,
        Imipenem: 78.31,
        "Cefoperazone + Sulbactam": 71.08,
        Amikacin: 68.6,
        Ertapenem: 67.4,
        Gentamycin: 67.4,
        Meropenem: 66.2,
        "Piperacillin + Tazobactam": 56.6,
        "Amoxicillin/Clavulanic Acid": 28.9,
        Tetracycline: 25.3,
        Cefepime: 19.2,
        Ceftriaxone: 16.8,
        Levofloxacin: 16.8,
        "Co-trimoxazole": 15.6,
        Cefixime: 9.6,
      },
      "Klebsiella spp": {},
      "Pseudomonas spp": {},
      "Proteus spp": {},
      "Enterococcus spp": {},
      "Citrobacter spp": {},
      "Enterobacter spp": {},
      "Myroides spp": {},
      "Providencia spp": {},
      "Staphylococcus spp": {},
    },
    Pus: {
      "Escherichia coli": {
        Amikacin: 93.9,
        Tigecycline: 84.8,
        Gentamycin: 81.8,
        Imipenem: 69.6,
        Meropenem: 66.6,
        "Cefoperazone + Sulbactam": 60.6,
        "Piperacillin + Tazobactam": 60.6,
        "Co-trimoxazole": 45.4,
        Tetracycline: 42.4,
        Levofloxacin: 30.3,
        Cefuroxime: 27.2,
        Ceftriaxone: 24.2,
        "Amoxicillin/Clavulanic Acid": 9.09,
      },
      "Enterococcus spp": {},
      "Klebsiella spp": {},
      "Staphylococcus spp": {},
      "Pseudomonas spp": {},
      "Acinetobacter spp": {},
      "Proteus spp": {},
      "Streptococcus spp": {},
      "Enterobacter spp": {},
      "Citrobacter spp": {},
      "Coagulase Negative Staphylococci": {},
      "Granulicatella spp": {},
      "Providencia spp": {},
      "Salmonella spp": {},
    },
    Wound: {
      "Escherichia coli": {
        Tigecycline: 95.8,
        Amikacin: 87.5,
        Gentamycin: 66.6,
        Meropenem: 58.3,
        Imipenem: 52.08,
        "Cefoperazone + Sulbactam": 47.9,
        "Co-trimoxazole": 33.3,
        "Piperacillin + Tazobactam": 31.2,
        Tetracycline: 27.08,
        Cefuroxime: 16.6,
        Levofloxacin: 14.5,
        "Amoxicillin/Clavulanic Acid": 8.3,
        Ceftriaxone: 8.3,
        Cefepime: 6.25,
      },
      "Klebsiella spp": {
        Tigecycline: 90.9,
        Amikacin: 59,
        Levofloxacin: 27.2,
        Meropenem: 27.2,
        "Amoxicillin/Clavulanic Acid": 22.7,
        Gentamycin: 22.7,
        Cefuroxime: 18.1,
        Cefepime: 13.6,
        Ceftriaxone: 13.6,
        Imipenem: 13.6,
        Tetracycline: 13.6,
        "Cefoperazone + Sulbactam": 9.09,
        "Co-trimoxazole": 9.09,
        "Piperacillin + Tazobactam": 4.5,
      },
      "Acinetobacter spp": {},
      "Enterobacter spp": {},
      "Enterococcus spp": {},
      "Morgonella spp": {},
      "Proteus spp": {},
      "Pseudomonas spp": {},
      "Staphylococcus spp": {},
      "Streptococcus spp": {},
    },
    Tissue: {
      "Escherichia coli": {
        Amikacin: 86.6,
        Imipenem: 86.6,
        Meropenem: 86.6,
        "Cefoperazone + Sulbactam": 80,
        "Piperacillin + Tazobactam": 73.3,
        Tigecycline: 73.3,
        Gentamycin: 60,
        "Amoxicillin/Clavulanic Acid": 40,
        "Co-trimoxazole": 40,
        Tetracycline: 26.6,
        Cefepime: 20,
        Ceftriaxone: 20,
        Levofloxacin: 13.3,
        Cefuroxime: 6.6,
      },
      "Klebsiella spp": {
        Tigecycline: 78.5,
        Meropenem: 64.2,
        "Cefoperazone + Sulbactam": 57.1,
        Gentamycin: 57.1,
        Imipenem: 57.1,
        "Piperacillin + Tazobactam": 50,
        Tetracycline: 50,
        "Co-trimoxazole": 50,
        Ceftriaxone: 42.8,
        Cefepime: 35.7,
        Levofloxacin: 35.7,
        Amikacin: 28.5,
        Cefuroxime: 21.4,
        "Amoxicillin/Clavulanic Acid": 7.1,
      },
      "Staphylococcus spp": {},
      "Pseudomonas spp": {},
      "Enterococcus spp": {},
      "Acinetobacter spp": {},
      "Enterobacter spp": {},
      "Proteus spp": {},
      "Streptococcus spp": {},
      "Burkholderia spp": {},
      "Kocuria Kristinae": {},
    },
    "BAL Fluid": {
      "Pseudomonas spp": {
        Imipenem: 81.8,
        Meropenem: 81.8,
        "Piperacillin + Tazobactam": 72.7,
        Cefepime: 63.6,
        Tobramycin: 63.6,
        Ceftazidime: 63.6,
        Aztreonam: 63.6,
        Ciprofloxacin: 36.3,
        Levofloxacin: 36.3,
      },
      "Klebsiella spp": {},
      "Acinetobacter spp": {},
      "Escherichia coli": {},
      "Streptococcus spp": {},
      "Burkholderia spp": {},
      "Hemophilus spp": {},
      "Stenotrophomonas maltophilia": {},
    },
    Sputum: {
      "Klebsiella spp": {
        Tigecycline: 81.8,
        Amikacin: 45.4,
        Meropenem: 45.4,
        Tetracycline: 45.4,
        "Amoxicillin/Clavulanic Acid": 36.3,
        Cefixime: 36.3,
        "Cefoperazone + Sulbactam": 36.3,
        Gentamycin: 36.3,
        Imipenem: 36.3,
        "Piperacillin + Tazobactam": 36.3,
        Cefuroxime: 27.2,
        Levofloxacin: 27.2,
        "Co-trimoxazole": 27.2,
        Cefepime: 18.1,
        Ceftriaxone: 18.1,
        Ciprofloxacin: 0,
      },
      "Pseudomonas spp": {},
      "Acinetobacter spp": {},
      "Escherichia coli": {},
      "Hemophilus spp": {},
      "Streptococcus spp": {},
      "Citrobacter spp": {},
    },
    "ET Secretions": {
      "Klebsiella spp": {
        "Co-trimoxazole": 37.5,
        Ertapenem: 25,
        Gentamycin: 25,
        Tetracycline: 25,
        Amikacin: 12.5,
        Ciprofloxacin: 12.5,
        Cefepime: 12.5,
        "Cefoperazone + Sulbactam": 12.5,
        Ceftriaxone: 12.5,
        Imipenem: 12.5,
        Levofloxacin: 12.5,
        Meropenem: 12.5,
        "Piperacillin + Tazobactam": 12.5,
        "Amoxicillin/Clavulanic Acid": 0,
        Cefuroxime: 0,
        Cefixime: 0,
      },
      "Pseudomonas spp": {},
      "Acinetobacter spp": {},
      "Escherichia coli": {},
      "Hemophilus spp": {},
      "Streptococcus spp": {},
      "Citrobacter spp": {},
    },
    Bile: {
      "Escherichia coli": {
        Amikacin: 100,
        Gentamycin: 100,
        Imipenem: 83.3,
        Meropenem: 83.3,
        "Cefoperazone + Sulbactam": 66.6,
        Tigecycline: 66.6,
        "Piperacillin + Tazobactam": 50,
        Tetracycline: 50,
        "Co-trimoxazole": 50,
        "Amoxicillin/Clavulanic Acid": 33.3,
        Cefepime: 33.3,
        Cefixime: 33.3,
        Ceftriaxone: 33.3,
        Cefuroxime: 16.6,
        Levofloxacin: 16.6,
      },
      "Enterococcus spp": {},
      "Klebsiella spp": {},
      "Pseudomonas spp": {},
      "Streptococcus spp": {},
    },
    Tip: {
      "Klebsiella spp": {
        Tigecycline: 80,
        "Cefoperazone + Sulbactam": 60,
        Ceftriaxone: 60,
        Gentamycin: 60,
        Meropenem: 60,
        "Piperacillin + Tazobactam": 60,
        Tetracycline: 60,
        Amikacin: 40,
        "Amoxicillin/Clavulanic Acid": 40,
        Imipenem: 40,
        Levofloxacin: 40,
        "Co-trimoxazole": 40,
        Cefepime: 0,
        Cefixime: 0,
        Cefuroxime: 0,
      },
      "Staphylococcus spp": {},
      "Acinetobacter spp": {},
      "Candida spp": {},
      "Escherichia coli": {},
      "Stenotrophomonas spp": {},
    },
    "Ascitic Fluid": {
      "Escherichia coli": {
        "Amoxicillin/Clavulanic Acid": 100,
        Tigecycline: 100,
        Amikacin: 66.6,
        Cefepime: 66.6,
        "Cefoperazone + Sulbactam": 66.6,
        Gentamycin: 66.6,
        Imipenem: 66.6,
        Meropenem: 66.6,
        Ceftriaxone: 33.3,
        Tetracycline: 33.3,
        Tobramycin: 33.3,
        Ciprofloxacin: 0,
        Levofloxacin: 0,
        Teicoplanin: 0,
        "Co-trimoxazole": 0,
      },
      "Burkholderia spp": {},
      "Klebsiella spp": {},
      "Pseudomonas spp": {},
    },
    "Pleural Fluid": {
      "Klebsiella spp": {
        "Co-trimoxazole": 100,
        Tigecycline: 100,
        Gentamycin: 100,
        Cefepime: 100,
        Amikacin: 100,
        Tetracycline: 66.6,
        "Piperacillin + Tazobactam": 66.6,
        Meropenem: 66.6,
        Levofloxacin: 66.6,
        Imipenem: 66.6,
        Doxycycline: 66.6,
        "Cefoperazone + Sulbactam": 66.6,
        Ceftriaxone: 66.6,
        Cefixime: 66.6,
        Cefuroxime: 66.6,
        Ciprofloxacin: 66.6,
        "Amoxicillin/Clavulanic Acid": 20,
      },
      "Pseudomonas spp": {},
      "Streptococcus spp": {},
    },
  },
  ICU: {
    Blood: {
      "Escherichia coli": {
        Ertapenem: 87.9,
        Tigecycline: 84.4,
        Imipenem: 81,
        Meropenem: 81,
        Amikacin: 77.5,
        "Cefoperazone + Sulbactam": 74.1,
        Gentamycin: 68.9,
        "Piperacillin + Tazobactam": 60,
        "Amoxicillin/Clavulanic Acid": 46.5,
        Levofloxacin: 37.9,
        Cefepime: 29.3,
        Tetracycline: 29.3,
        "Co-trimoxazole": 25.8,
        Cefixime: 24.1,
        Ciprofloxacin: 17.2,
        Ceftriaxone: 15.5,
        Cefuroxime: 13.7,
      },
      "Klebsiella spp": {
        Tigecycline: 91.3,
        Gentamycin: 56.5,
        Amikacin: 34.7,
        "Cefoperazone + Sulbactam": 34.7,
        Ertapenem: 30,
        Tetracycline: 30,
        Ciprofloxacin: 26,
        Meropenem: 26,
        "Piperacillin + Tazobactam": 26,
        Imipenem: 21.7,
        "Amoxicillin/Clavulanic Acid": 19.5,
        Cefuroxime: 17.3,
        Cefepime: 17.3,
        Levofloxacin: 17.3,
        "Co-trimoxazole": 17.3,
        Cefixime: 13,
        Ceftriaxone: 13,
      },
      "Staphylococcus spp": {},
      "Pseudomonas spp": {},
      "Enterococcus spp": {},
      "Achromobacter spp": {},
      "Candida spp": {},
      "Stenotrophomonas maltophilia": {},
      "Streptococcus spp": {},
      "Sphingomonas spp": {},
      "Coagulase Negative Staphylococcus": {},
      "Enterobacter spp": {},
      "Salmonella spp": {},
      "Ralostonia spp": {},
      "Aeromonas spp": {},
      "Burkholderia spp": {},
      "Acinetobacter spp": {},
      "Cryptococcus spp": {},
      "Proteus spp": {},
      "Orchobactrum spp": {},
    },
    Urine: {
      "Escherichia coli": {
        Fosfomycin: 89.2,
        Amikacin: 78.4,
        Nitrofurantoin: 78.4,
        Meropenem: 63,
        "Co-trimoxazole": 61.5,
        "Piperacillin + Tazobactam": 58.4,
        Ertapenem: 47.6,
        Cefuroxime: 41.5,
        "Cefoperazone + Sulbactam": 38.4,
        Imipenem: 38.4,
        Ciprofloxacin: 35.3,
        Gentamycin: 33.8,
        "Amoxicillin/Clavulanic Acid": 32.3,
        Cefepime: 32.3,
        Ceftriaxone: 26.1,
        Tetracycline: 21.5,
        Levofloxacin: 15.3,
        Cefixime: 12.3,
      },
      "Klebsiella spp": {},
      "Enterococcus spp": {},
      "Pseudomonas spp": {},
      "Enterobacter spp": {},
      "Acinetobacter spp": {},
      "Non-Fermenting Gram-Negative Bacilli": {},
      "Proteus spp": {},
      "Staphylococcus spp": {},
      "Citrobacter spp": {},
      "Morgonella spp": {},
    },
    "ET Secretions": {
      "Klebsiella spp": {
        Gentamycin: 50.9,
        Amikacin: 49,
        Doxycycline: 39.2,
        Meropenem: 37.2,
        Imipenem: 35.2,
        "Piperacillin + Tazobactam": 33.3,
        "Co-trimoxazole": 31.3,
        Levofloxacin: 29.4,
        Cefuroxime: 27.4,
        "Cefoperazone + Sulbactam": 27.4,
        Cefepime: 27.4,
        Ceftriaxone: 25.4,
        Ciprofloxacin: 21.5,
        Cefixime: 21.5,
        Tigecycline: 19.6,
        Tetracycline: 19.6,
        "Amoxicillin/Clavulanic Acid": 19.6,
      },
      "Acinetobacter spp": {
        Tigecycline: 57.4,
        "Co-trimoxazole": 51,
        Doxycycline: 31.9,
        Tobramycin: 21.2,
        Ceftriaxone: 21.2,
        "Ampicillin + Sulbactam": 14.8,
        Ceftazidime: 10.6,
        Gentamycin: 8.5,
        Colistin: 8.5,
        Ciprofloxacin: 8.5,
        "Cefoperazone + Sulbactam": 8.5,
        Levofloxacin: 4.2,
        Cefepime: 4.2,
        "Piperacillin + Tazobactam": 2.1,
        Meropenem: 2.1,
        Imipenem: 2.1,
        Amikacin: 2.1,
      },
      "Pseudomonas spp": {},
      "Staphylococcus spp": {},
      "Streptococcus spp": {},
      "Escherichia coli": {},
      "Stenotrophmonas maltophilia": {},
      "Hemophilus spp": {},
      "Non-Fermenting Gram-Negative Bacilli": {},
      "Moraxella spp": {},
      "Gram Positive Bacilli": {},
      "Candida spp": {},
    },
    "Wound Swab": {
      "Klebsiella spp": {
        Amikacin: 70.8,
        Doxycycline: 62.5,
        Tigecycline: 54.1,
        Tetracycline: 20.8,
        Imipenem: 20.8,
        Gentamycin: 20.8,
        Cefixime: 20.8,
        "Co-trimoxazole": 20,
        Levofloxacin: 16.6,
        Cefepime: 16.6,
        "Piperacillin + Tazobactam": 12.5,
        Meropenem: 12.5,
        Ciprofloxacin: 12.5,
        "Cefoperazone + Sulbactam": 12.5,
        Cefuroxime: 8.3,
        Ceftriaxone: 8.3,
        "Amoxicillin/Clavulanic Acid": 0,
      },
      "Pseudomonas spp": {
        Tobramycin: 82.6,
        "Piperacillin + Tazobactam": 82.6,
        Meropenem: 73.9,
        Ceftazidime: 73.9,
        Imipenem: 69.5,
        Aztreonam: 69.5,
        Levofloxacin: 65.2,
        Cefepime: 60.8,
        Ciprofloxacin: 56.5,
      },
      "Escherichia coli": {},
      "Staphylococcus spp": {},
      "Acinetobacter spp": {},
      "Enterococcus spp": {},
      "Proteus spp": {},
      "Stenotrophomonas spp": {},
      "Streptococcus spp": {},
      "Providencia spp": {},
      "Morgonella spp": {},
      "Gram Positive Bacilli": {},
      "Coagulase Negative Staphylococci spp": {},
      "Candida spp": {},
    },
    Pus: {
      "Escherichia coli": {
        Amikacin: 93.3,
        Tigecycline: 80,
        "Amoxicillin/Clavulanic Acid": 73.3,
        "Piperacillin + Tazobactam": 66.6,
        Gentamycin: 60,
        "Cefoperazone + Sulbactam": 53.3,
        Meropenem: 46.6,
        Imipenem: 46.6,
        "Co-trimoxazole": 40,
        Tetracycline: 33.3,
        Cefuroxime: 33.3,
        Levofloxacin: 26.6,
        Cefepime: 26.6,
        Ciprofloxacin: 20,
        Ceftriaxone: 13.3,
        Doxycycline: 6.6,
      },
      "Staphylococcus spp": {},
      "Klebsiella spp": {},
      "Pseudomonas spp": {},
      "Acinetobacter spp": {},
      "Enterococcus spp": {},
      "Proteus spp": {},
      "Streptococcus spp": {},
      "Pantoea Aggalomerans": {},
    },
    Tissue: {
      "Klebsiella spp": {
        Ciprofloxacin: 25,
        Levofloxacin: 12.5,
        "Co-trimoxazole": 12.5,
        Cefuroxime: 37.5,
        "Amoxicillin/Clavulanic Acid": 12.5,
        Ceftriaxone: 25,
        Cefepime: 25,
        Tigecycline: 25,
        Gentamycin: 37.5,
        Amikacin: 37.5,
        Imipenem: 25,
        Meropenem: 25,
        Tetracycline: 12.5,
        Doxycycline: 37.5,
        "Piperacillin + Tazobactam": 25,
        "Cefoperazone + Sulbactam": 25,
        Cefixime: 25,
      },
      "Pseudomonas spp": {},
      "Escherichia coli": {},
      "Enterococcus spp": {},
      "Streptococcus spp": {},
      "Proteus spp": {},
      "Acinetobacter spp": {},
      "Staphylococcus spp": {},
    },
    "BAL Fluid": {
      "Acinetobacter spp": {
        Tigecycline: 57.1,
        Tobramycin: 50,
        Doxycycline: 28.5,
        "Co-trimoxazole": 21.4,
        Tetracycline: 14.2,
        "Amoxicillin/Clavulanic Acid": 14.2,
        Colistin: 7.1,
        "Piperacillin + Tazobactam": 0,
        Minocycline: 0,
        Meropenem: 0,
        Levofloxacin: 0,
        Imipenem: 0,
        Gentamycin: 0,
        Ciprofloxacin: 0,
        Ceftriaxone: 0,
        Ceftazidime: 0,
        "Cefoperazone + Sulbactam": 0,
        Cefepime: 0,
        Amikacin: 0,
      },
      "Klebsiella spp": {
        Amikacin: 69.2,
        Gentamycin: 53.8,
        "Co-trimoxazole": 46.1,
        Meropenem: 38.4,
        Levofloxacin: 38.4,
        Tetracycline: 30.7,
        "Piperacillin + Tazobactam": 30.7,
        Imipenem: 30.7,
        Doxycycline: 30.7,
        Ciprofloxacin: 30.7,
        Cefuroxime: 30.7,
        "Cefoperazone + Sulbactam": 30.7,
        Tigecycline: 23,
        Cefepime: 23,
        Ceftriaxone: 15.3,
        Cefixime: 15.3,
        "Amoxicillin/Clavulanic Acid": 15.3,
      },
      "Streptococcus spp": {},
      "Stenotrophomonas spp": {},
      "Escherichia coli": {},
    },
    Sputum: {
      "Klebsiella spp": {
        "Co-trimoxazole": 81.8,
        Doxycycline: 63.6,
        Amikacin: 63.6,
        Tetracycline: 45.4,
        "Piperacillin + Tazobactam": 45.4,
        Meropenem: 45.4,
        Gentamycin: 45.4,
        Imipenem: 36.3,
        "Cefoperazone + Sulbactam": 36.3,
        Levofloxacin: 27.2,
        "Amoxicillin/Clavulanic Acid": 27.2,
        Ceftriaxone: 18.1,
        Cefepime: 18.1,
        Ciprofloxacin: 9.09,
        Cefuroxime: 9.09,
        Tigecycline: 0,
      },
      "Acinetobacter spp": {
        "Co-trimoxazole": 57.1,
        Tobramycin: 42.8,
        Minocycline: 42.8,
        "Ampicillin + Sulbactam": 42.8,
        Tigecycline: 28.5,
        Tetracycline: 28.5,
        Imipenem: 28.5,
        Doxycycline: 28.5,
        Ceftazidime: 28.5,
        "Amoxicillin/Clavulanic Acid": 28.5,
        "Piperacillin + Tazobactam": 14.2,
        Meropenem: 14.2,
        Gentamycin: 14.2,
        "Cefoperazone + Sulbactam": 14.2,
        Amikacin: 14.2,
        Levofloxacin: 0,
        Ciprofloxacin: 0,
        Ceftriaxone: 0,
        Cefepime: 0,
      },
      "Hemophillus spp": {},
      "Pseudomonas spp": {},
      "Escherichia coli": {},
      "Staphylococcus spp": {},
      "Stenotrophomonas spp": {},
      "Salmonela spp": {},
      "Gram Positive Rod": {},
    },
  },
};

export default function App() {
  const [selectedDept, setSelectedDept] = useState("OP");
  const [selectedSpecimen, setSelectedSpecimen] = useState("Urine");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pathogenSearchQuery, setPathogenSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null); // Added state for Modal

  const departments = Object.keys(antibiogramData);

  // Derive valid specimens when department changes to ensure default view is correct
  const availableSpecimens = Object.keys(antibiogramData[selectedDept] || {});

  // Safe change handlers
  const handleDeptChange = (dept) => {
    setSelectedDept(dept);
    const newSpecimens = Object.keys(antibiogramData[dept]);
    if (!newSpecimens.includes(selectedSpecimen)) {
      setSelectedSpecimen(newSpecimens[0]);
    }
  };

  // Logic to structure master chart for Active Dept & Specimen
  const chartData = useMemo(() => {
    const dataObj = antibiogramData[selectedDept]?.[selectedSpecimen];
    if (!dataObj) return { pathogens: [], antibiotics: [], matrix: {} };

    const pathogens = Object.keys(dataObj).sort();
    const antibioticSet = new Set();

    // Extract unique antibiotics
    pathogens.forEach((path) => {
      Object.keys(dataObj[path]).forEach((anti) => antibioticSet.add(anti));
    });

    const antibiotics = Array.from(antibioticSet).sort();
    return { pathogens, antibiotics, matrix: dataObj };
  }, [selectedDept, selectedSpecimen]);

  // Color coding and badge formatting (Updated for Dark Mode Compatibility)
  const renderCell = (value) => {
    if (value === undefined || value === null)
      return (
        <span className="text-slate-300 dark:text-slate-600 font-medium">
          -
        </span>
      );

    if (value >= 70) {
      return (
        <span className="inline-flex items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 text-base font-bold text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 shadow-sm w-full transition-transform group-hover:scale-105">
          ++
        </span>
      );
    } else if (value >= 50 && value < 70) {
      return (
        <span className="inline-flex items-center justify-center rounded-md bg-amber-100 dark:bg-amber-500/20 px-2 py-1 text-base font-bold text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 shadow-sm w-full transition-transform group-hover:scale-105">
          +
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center justify-center rounded-md bg-rose-100 dark:bg-rose-500/20 px-2 py-1 text-base font-bold text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 shadow-sm w-full transition-transform group-hover:scale-105">
          x
        </span>
      );
    }
  };

  const handleCellClick = (pathogen, antibiotic, value) => {
    if (value === undefined || value === null) return;

    let category = "";
    let colorClass = "";
    let icon = null;

    if (value >= 70) {
      category = "Sensitive";
      colorClass =
        "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30";
      icon = <ShieldCheck className="text-emerald-500" size={24} />;
    } else if (value >= 50 && value < 70) {
      category = "Limited Utility";
      colorClass =
        "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30";
      icon = <ShieldAlert className="text-amber-500" size={24} />;
    } else {
      category = "Not Preferred";
      colorClass =
        "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30";
      icon = <ShieldAlert className="text-rose-500" size={24} />;
    }

    setSelectedCell({
      pathogen,
      antibiotic,
      value,
      category,
      colorClass,
      icon,
    });
  };

  const filteredAntibiotics = chartData.antibiotics.filter((a) =>
    a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pathogenTerms = pathogenSearchQuery
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  const filteredPathogens = chartData.pathogens.filter((p) => {
    if (pathogenTerms.length === 0) return true;
    return pathogenTerms.some((term) => p.toLowerCase().includes(term));
  });

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 z-40 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Modal Overlay for Cell Details */}
        {selectedCell && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCell(null)}
          >
            <div
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-transform"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Info size={18} className="text-blue-500" />
                  Sensitivity Details
                </h3>
                <button
                  onClick={() => setSelectedCell(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Pathogen
                  </p>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                    {selectedCell.pathogen}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Antibiotic
                  </p>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                    {selectedCell.antibiotic}
                  </p>
                </div>

                <div
                  className={`mt-4 p-4 rounded-xl border ${selectedCell.colorClass} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    {selectedCell.icon}
                    <div>
                      <p className="font-bold text-sm">
                        {selectedCell.category}
                      </p>
                      <p className="text-xs opacity-80 mt-0.5">
                        Legend matched
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black">
                      {selectedCell.value}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Deep Midnight Gradient */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-r border-slate-700/50 transition-all duration-300 ease-in-out shrink-0 overflow-hidden shadow-xl md:relative md:z-auto text-slate-100
          ${
            isSidebarOpen
              ? "w-72 translate-x-0"
              : "w-72 -translate-x-full md:translate-x-0"
          }
          ${isSidebarCollapsed ? "md:w-0 md:border-r-0" : "md:w-72"}
        `}
        >
          <div className="w-72 h-full flex flex-col">
            <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">
                  Antibiogram 2024
                </h1>
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mt-1">
                  Manipal Hospitals
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X size={18} />
                </button>
                <button
                  className="hidden md:block p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                  onClick={() => setIsSidebarCollapsed(true)}
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Department Selection */}
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                  <Activity size={14} /> Department
                </h2>
                <div className="space-y-1">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => handleDeptChange(dept)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-between group ${
                        selectedDept === dept
                          ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>
                        {dept === "OP"
                          ? "Out-Patient (OP)"
                          : dept === "IP"
                          ? "In-Patient (IP)"
                          : "Intensive Care Unit (ICU)"}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform ${
                          selectedDept === dept
                            ? "opacity-100 translate-x-1"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Specimen Selection */}
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                  <Syringe size={14} /> Specimen Type
                </h2>
                <div className="space-y-1">
                  {availableSpecimens.map((specimen) => (
                    <button
                      key={specimen}
                      onClick={() => {
                        setSelectedSpecimen(specimen);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedSpecimen === specimen
                          ? "bg-slate-700/80 text-white shadow-sm ring-1 ring-white/10"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {specimen}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header Banner - Vibrant Blue/Indigo to Dark Blue Gradient */}
          <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 dark:from-blue-900 dark:via-indigo-950 dark:to-slate-900 px-4 py-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 shadow-md shrink-0 border-none transition-colors duration-300">
            <div className="flex items-center gap-3">
              <button
                className={`p-2 -ml-2 rounded-md text-white/80 hover:bg-white/10 transition-colors ${
                  isSidebarCollapsed ? "block" : "md:hidden"
                }`}
                onClick={() => {
                  setIsSidebarOpen(true);
                  setIsSidebarCollapsed(false);
                }}
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Sensitivity Master Chart
                </h2>
                <div className="flex items-center text-sm text-blue-100 mt-0.5 gap-2 font-medium">
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-white shadow-sm">
                    {selectedDept}
                  </span>
                  <span className="text-blue-300 dark:text-blue-500">/</span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-white shadow-sm">
                    {selectedSpecimen}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200 dark:text-blue-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Filter pathogens (e.g., E.coli, Kleb)..."
                  value={pathogenSearchQuery}
                  onChange={(e) => setPathogenSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-white/20 dark:border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all bg-black/10 dark:bg-black/30 text-white placeholder-blue-200 dark:placeholder-blue-400 focus:bg-black/20 dark:focus:bg-black/40 backdrop-blur-sm"
                />
              </div>
              <div className="relative w-full sm:w-48">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200 dark:text-blue-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Filter antibiotics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-white/20 dark:border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all bg-black/10 dark:bg-black/30 text-white placeholder-blue-200 dark:placeholder-blue-400 focus:bg-black/20 dark:focus:bg-black/40 backdrop-blur-sm"
                />
              </div>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hidden sm:flex p-2 ml-2 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {/* Mobile toggle embedded in search area */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="sm:hidden w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-full bg-black/10 text-white/80 hover:bg-black/20 transition-colors"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm font-medium">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>
          </header>

          {/* Legend */}
          <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-4 py-3 sm:px-8 flex flex-wrap gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 shadow-sm z-10 shrink-0 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-transparent dark:border-emerald-500/30">
                ++
              </span>
              <span>Sensitive (≥ 70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-500" />
              <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 px-1.5 py-0.5 rounded border border-transparent dark:border-amber-500/30">
                +
              </span>
              <span>Limited Utility (50-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-500" />
              <span className="bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-400 px-1.5 py-0.5 rounded border border-transparent dark:border-rose-500/30">
                x
              </span>
              <span>Not Preferred (&lt; 50%)</span>
            </div>
          </div>

          {/* Chart Area */}
          <div className="flex-1 overflow-hidden p-4 sm:p-8 bg-slate-50/50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
              {chartData.pathogens.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-12 text-center shadow-sm">
                  <ShieldAlert className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">
                    No data available
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    No pathogens mapped for this combination.
                  </p>
                </div>
              ) : filteredPathogens.length === 0 &&
                chartData.pathogens.length > 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-12 text-center shadow-sm">
                  <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">
                    No pathogens found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Adjust your pathogen search filter.
                  </p>
                </div>
              ) : filteredAntibiotics.length === 0 &&
                chartData.antibiotics.length > 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-12 text-center shadow-sm">
                  <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">
                    No antibiotics found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Adjust your antibiotic search filter.
                  </p>
                </div>
              ) : chartData.antibiotics.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-12 text-center shadow-sm">
                  <Activity className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">
                    No Sensitivity Data Available
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Pathogens were isolated but detailed sensitivity tables are
                    not available for this specimen.
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5 transition-colors duration-300">
                  <div className="overflow-auto flex-1">
                    <table className="w-full text-left text-sm whitespace-nowrap border-separate border-spacing-0">
                      <thead>
                        <tr>
                          <th className="sticky top-0 left-0 z-30 bg-slate-100 dark:bg-slate-800 px-6 py-4 font-bold text-slate-700 dark:text-slate-300 shadow-[inset_-1px_-1px_0_#e2e8f0] dark:shadow-[inset_-1px_-1px_0_#334155] w-64 min-w-[250px] transition-colors duration-300">
                            Pathogen
                          </th>
                          {filteredAntibiotics.map((antibiotic) => (
                            <th
                              key={antibiotic}
                              className="sticky top-0 z-20 px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-center min-w-[160px] bg-slate-50 dark:bg-slate-800/90 shadow-[inset_0_-1px_0_#e2e8f0] dark:shadow-[inset_0_-1px_0_#334155] transition-colors duration-300"
                            >
                              {antibiotic}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-900 transition-colors duration-300">
                        {filteredPathogens.map((pathogen) => (
                          <tr
                            key={pathogen}
                            className="hover:bg-slate-50/75 dark:hover:bg-slate-800/75 transition-colors"
                          >
                            <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-6 py-3.5 font-medium text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-800 shadow-[inset_-1px_0_0_#e2e8f0] dark:shadow-[inset_-1px_0_0_#334155] flex items-center gap-2 transition-colors duration-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></div>
                              {pathogen}
                            </td>
                            {filteredAntibiotics.map((antibiotic) => {
                              const val =
                                chartData.matrix[pathogen][antibiotic];
                              const isClickable =
                                val !== undefined && val !== null;
                              return (
                                <td
                                  key={`${pathogen}-${antibiotic}`}
                                  onClick={() =>
                                    handleCellClick(pathogen, antibiotic, val)
                                  }
                                  className={`group px-6 py-3.5 text-center border-b border-gray-100 dark:border-slate-800 transition-colors duration-300 ${
                                    isClickable
                                      ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                                      : ""
                                  }`}
                                >
                                  {renderCell(val)}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
