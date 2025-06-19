
// Utilitaires de calcul fiscal

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

// Barème de l'impôt sur le revenu 2024 (par part)
export const IR_BRACKETS_2024: TaxBracket[] = [
  { min: 0, max: 11294, rate: 0 },
  { min: 11294, max: 28797, rate: 11 },
  { min: 28797, max: 82341, rate: 30 },
  { min: 82341, max: 177106, rate: 41 },
  { min: 177106, max: null, rate: 45 }
];

// Taux des prélèvements sociaux
export const SOCIAL_RATES_2024 = {
  SALARY_EMPLOYEE: 0.2223, // Part salarié
  SALARY_EMPLOYER: 0.4512, // Part employeur
  TNS: 0.4512, // Travailleurs non salariés
  CAPITAL_GAINS: 0.172, // Plus-values
  DIVIDENDS: 0.172 // Dividendes
};

// Taux d'impôt sur les sociétés
export const CORPORATE_TAX_2024 = {
  REDUCED_RATE: 0.15, // Taux réduit (jusqu'à 42 500€)
  STANDARD_RATE: 0.25 // Taux normal
};

// PFU (Prélèvement Forfaitaire Unique)
export const PFU_2024 = {
  IR_RATE: 0.128,
  SOCIAL_RATE: 0.172,
  TOTAL_RATE: 0.30
};

// Calcul de l'impôt sur le revenu selon le barème progressif
export function calculateProgressiveIR(taxableIncome: number, shares: number): number {
  const incomePerShare = taxableIncome / shares;
  let tax = 0;
  
  for (const bracket of IR_BRACKETS_2024) {
    if (incomePerShare <= bracket.min) break;
    
    const max = bracket.max || incomePerShare;
    const taxableInBracket = Math.min(incomePerShare, max) - bracket.min;
    
    if (taxableInBracket > 0) {
      tax += taxableInBracket * (bracket.rate / 100);
    }
  }
  
  return tax * shares;
}

// Calcul du quotient familial
export function calculateFamilialShares(isMarried: boolean, children: number, hasDisability: boolean = false): number {
  let shares = isMarried ? 2 : 1;
  
  if (children === 1) {
    shares += 0.5;
  } else if (children === 2) {
    shares += 1;
  } else if (children >= 3) {
    shares += 1 + (children - 2);
  }
  
  if (hasDisability) {
    shares += 0.5;
  }
  
  return shares;
}

// Calcul des abattements pour plus-values immobilières
export function calculateRealEstateAbatements(detentionYears: number): {
  irAbatement: number;
  socialAbatement: number;
} {
  let irAbatement = 0;
  let socialAbatement = 0;
  
  // Abattement IR
  if (detentionYears > 5 && detentionYears <= 21) {
    irAbatement = (detentionYears - 5) * 6;
  } else if (detentionYears >= 22) {
    irAbatement = 100;
  }
  
  // Abattement prélèvements sociaux
  if (detentionYears > 5 && detentionYears <= 21) {
    socialAbatement = (detentionYears - 5) * 1.65;
  } else if (detentionYears >= 22 && detentionYears <= 29) {
    socialAbatement = 26.4 + (detentionYears - 22) * 9;
  } else if (detentionYears >= 30) {
    socialAbatement = 100;
  }
  
  return { irAbatement, socialAbatement };
}

// Calcul des abattements pour plus-values mobilières (titres acquis avant 2018)
export function calculateSecuritiesAbatements(detentionYears: number): number {
  if (detentionYears < 2) return 0;
  if (detentionYears >= 2 && detentionYears < 8) {
    return detentionYears * 12.5;
  }
  return 100; // 8 ans et plus
}

// Calcul des droits de donation
export interface DonationTax {
  taxableAmount: number;
  tax: number;
  abatementUsed: number;
}

export function calculateDonationTax(
  donationAmount: number,
  relationship: 'child' | 'spouse' | 'grandchild' | 'nephew' | 'other',
  previousAbatementUsed: number = 0
): DonationTax {
  // Abattements par relation
  const abatements = {
    child: 100000,
    spouse: 80724,
    grandchild: 31865,
    nephew: 7967,
    other: 0
  };
  
  // Barèmes par relation (simplifié)
  const taxBrackets = {
    child: [
      { min: 0, max: 8072, rate: 5 },
      { min: 8072, max: 12109, rate: 10 },
      { min: 12109, max: 15932, rate: 15 },
      { min: 15932, max: 552324, rate: 20 },
      { min: 552324, max: 902838, rate: 30 },
      { min: 902838, max: 1805677, rate: 40 },
      { min: 1805677, max: null, rate: 45 }
    ],
    spouse: [{ min: 0, max: null, rate: 0 }], // Exempt
    grandchild: [
      { min: 0, max: 8072, rate: 5 },
      { min: 8072, max: 15932, rate: 10 },
      { min: 15932, max: 31865, rate: 15 },
      { min: 31865, max: null, rate: 20 }
    ],
    nephew: [
      { min: 0, max: 8072, rate: 35 },
      { min: 8072, max: 15932, rate: 45 },
      { min: 15932, max: null, rate: 55 }
    ],
    other: [
      { min: 0, max: null, rate: 60 }
    ]
  };
  
  const abatement = abatements[relationship];
  const remainingAbatement = Math.max(0, abatement - previousAbatementUsed);
  const abatementUsed = Math.min(donationAmount, remainingAbatement);
  const taxableAmount = Math.max(0, donationAmount - abatementUsed);
  
  // Calcul de la taxe
  let tax = 0;
  const brackets = taxBrackets[relationship];
  
  for (const bracket of brackets) {
    if (taxableAmount <= bracket.min) break;
    
    const max = bracket.max || taxableAmount;
    const taxableInBracket = Math.min(taxableAmount, max) - bracket.min;
    
    if (taxableInBracket > 0) {
      tax += taxableInBracket * (bracket.rate / 100);
    }
  }
  
  return {
    taxableAmount,
    tax,
    abatementUsed
  };
}

// Calcul de la valeur de la nue-propriété selon l'âge
export function calculateBareOwnershipValue(fullOwnershipValue: number, usufructuaryAge: number): number {
  let usufructRate = 0;
  
  if (usufructuaryAge < 21) usufructRate = 90;
  else if (usufructuaryAge < 31) usufructRate = 80;
  else if (usufructuaryAge < 41) usufructRate = 70;
  else if (usufructuaryAge < 51) usufructRate = 60;
  else if (usufructuaryAge < 61) usufructRate = 50;
  else if (usufructuaryAge < 71) usufructRate = 40;
  else if (usufructuaryAge < 81) usufructRate = 30;
  else if (usufructuaryAge < 91) usufructRate = 20;
  else usufructRate = 10;
  
  const bareOwnershipRate = 100 - usufructRate;
  return fullOwnershipValue * (bareOwnershipRate / 100);
}

// Calcul CEHR (Contribution Exceptionnelle sur les Hauts Revenus)
export function calculateCEHR(rfr: number, shares: number): number {
  const rfrPerShare = rfr / shares;
  
  let rate = 0;
  if (shares === 1) {
    if (rfrPerShare > 250000 && rfrPerShare <= 500000) rate = 3;
    else if (rfrPerShare > 500000) rate = 4;
  } else if (shares <= 2) {
    if (rfrPerShare > 500000 && rfrPerShare <= 1000000) rate = 3;
    else if (rfrPerShare > 1000000) rate = 4;
  }
  
  return rfr * (rate / 100);
}

// Utilitaire pour formater les montants
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Utilitaire pour formater les pourcentages
export function formatPercentage(rate: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(rate / 100);
}
