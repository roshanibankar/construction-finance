'use client';

import React, { useState, ChangeEvent, FormEvent, JSX } from 'react';
import styles from './page.module.css';

interface FinancialState {
  projectCost: number;
  ltvPercentage: number;
}

export default function ComingSoonPage(): JSX.Element {
  const [financials, setFinancials] = useState<FinancialState>({
    projectCost: 5000000,
    ltvPercentage: 70,
  });

  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFinancials((prev) => ({ ...prev, projectCost: Number(e.target.value) }));
  };

  const handleLtvChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFinancials((prev) => ({ ...prev, ltvPercentage: Number(e.target.value) }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  const bankDebt: number = financials.projectCost * (financials.ltvPercentage / 100);
  const requiredEquity: number = financials.projectCost - bankDebt;

  const formatCurrency = (amount: number): string => {
    return `$${(amount / 1000000).toFixed(2)}M`;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logoGroup}>
          <span className={styles.pulseDot} />
          <span className={styles.logoText}>Construction Finance</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className={styles.mainGrid}>
        {/* Left Column: Copy + Form */}
        <div className={styles.leftColumn}>
          <h1 className={styles.title}>
            Design with Form. <br />
            <span className={styles.titleMuted}>Validate with Finance.</span>
          </h1>
          <p className={styles.description}>
            The interactive feasibility engine built for architects, developers and students. Master Cap Rates, LTV, IRR, and DCF analysis to make your designs financially sound.
          </p>

          {!isSubmitted ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Request Early Access
              </button>
            </form>
          ) : (
            <div className={styles.successBanner}>
              ✓ You are on the early access list!
            </div>
          )}
        </div>

        {/* Right Column: Live Calculation Card */}
        <div className={styles.rightColumn}>
          <div className={styles.previewCard}>

            <div className={styles.controlGroup}>
              <div className={styles.labelRow}>
                <span>Project Cost ($)</span>
                <span className={styles.monoValue}>{formatCurrency(financials.projectCost)}</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={20000000}
                step={500000}
                value={financials.projectCost}
                onChange={handleCostChange}
                className={styles.slider}
              />
            </div>

            <div className={styles.controlGroup}>
              <div className={styles.labelRow}>
                <span>Loan-to-Value (LTV %)</span>
                <span className={styles.monoValue}>{financials.ltvPercentage}%</span>
              </div>
              <input
                type="range"
                min={40}
                max={85}
                step={5}
                value={financials.ltvPercentage}
                onChange={handleLtvChange}
                className={styles.slider}
              />
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metricBox}>
                <span className={styles.metricLabel}>Bank Debt</span>
                <span className={styles.metricValueDebt}>{formatCurrency(bankDebt)}</span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricLabel}>Required Equity</span>
                <span className={styles.metricValueEquity}>{formatCurrency(requiredEquity)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        Designed for architects who build. Inspired by Columbia University's course on Construction Finance.
      </footer>
    </div>
  );
}
