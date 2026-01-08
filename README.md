# Enterprise Software UI Environments

Open-source, pixel-perfect UI clones of legacy enterprise software for demos, testing, automation development, and education.

![SAP](https://img.shields.io/badge/SAP-Business%20One%20%7C%20S%2F4HANA-orange)
![Greenway](https://img.shields.io/badge/Greenway-Prime%20Suite%20EHR-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![License](https://img.shields.io/badge/license-MIT-blue)

## Available Environments

| Environment | Description | Demo |
|-------------|-------------|------|
| [SAP](/sap) | SAP Business One & S/4HANA | Journal Entry, Invoices, G/L Line Items |
| [Greenway](/greenway) | Greenway Prime Suite EHR | Patient charts, encounters, scheduling |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/mediar-ai/environments.git
cd environments

# Run SAP environment
cd sap && bun install && bun dev
# Open http://localhost:3000

# Or run Greenway environment
cd greenway && bun install && bun dev
# Open http://localhost:3000
```

## SAP Environment

Pixel-perfect clone of SAP Business One and SAP S/4HANA interfaces.

### SAP Business One (B1)
- Orange accent theme (#e1692c)
- Journal Entry form with validation
- Modules navigation tree
- Modern toolbar and status bar

### SAP S/4HANA (Fiori)
- Blue Fiori theme (#0a6ed1)
- FB50 - Journal Entry
- MIRO - Invoice Verification
- FBL3N - G/L Account Line Items
- SAP Easy Access menu

**Version Switcher** - Toggle between B1 and S/4HANA in the title bar.

## Greenway Environment

Clone of Greenway Prime Suite EHR (Electronic Health Records) system.

- Patient chart interface
- Clinical encounter forms
- Scheduling views
- Medical record navigation

## Use Cases

- **Demo Videos** - Create marketing content showing automation of legacy software
- **UI/UX Testing** - Test automation scripts against realistic enterprise UIs
- **Training** - Learn enterprise software interface patterns
- **Development** - Build integrations with familiar UI reference
- **Automation Testing** - Develop and test RPA/automation workflows

## Tech Stack

All environments use the same modern stack:

- **Next.js 16** - React framework with App Router
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Icon library
- **TypeScript** - Type safety

## PWA Support

Each environment includes a manifest for installing as a desktop app:

1. Open in Edge or Chrome
2. Click the install icon in the address bar
3. The app will open in its own window, looking like native software

## Project Structure

```
environments/
├── sap/                    # SAP Business One & S/4HANA
│   ├── src/app/
│   │   ├── page.tsx        # B1 Home
│   │   ├── b1/journal/     # B1 Journal Entry
│   │   ├── fb50/           # S/4HANA Journal Entry
│   │   ├── miro/           # S/4HANA Invoice
│   │   └── fbl3n/          # S/4HANA G/L Items
│   └── src/components/     # SAP UI components
│
├── greenway/               # Greenway Prime Suite EHR
│   ├── src/app/
│   └── src/components/     # EHR UI components
│
└── README.md               # This file
```

## Contributing

We welcome contributions! Ideas for new environments:

- Epic Systems (MyChart, Hyperspace)
- Cerner PowerChart
- Oracle NetSuite
- Microsoft Dynamics
- Sage Intacct
- QuickBooks Desktop

To add a new environment:

1. Create a new directory with the software name
2. Use Next.js 16 + Tailwind CSS 4
3. Match the real UI as closely as possible
4. Include a README with screenshots
5. Submit a PR

## Disclaimer

These are **unofficial** UI mockups for educational and demo purposes only. All product names, logos, and brands are property of their respective owners. This project is not affiliated with, endorsed by, or connected to SAP SE, Greenway Health, or any other software vendor.

## License

MIT License - free to use for demos, testing, education, and development.

---

Built by [Mediar](https://mediar.ai) - AI-powered workflow automation for legacy enterprise software.
