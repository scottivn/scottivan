#!/usr/bin/env python3
"""Generate Scott Ivan's resume as a clean, elegant PDF."""

import os
from fpdf import FPDF

# ── Output path ──────────────────────────────────────────────────────────────
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "sites", "me", "public")
OUT_PATH = os.path.join(OUT_DIR, "resume.pdf")

# ── Colors ───────────────────────────────────────────────────────────────────
BLACK = (15, 15, 15)
DARK = (45, 45, 48)
MID = (100, 100, 105)
LIGHT = (150, 150, 155)
ACCENT = (190, 130, 30)       # warm amber
RULE = (210, 210, 215)
WHITE = (255, 255, 255)


class ResumePDF(FPDF):
    def __init__(self):
        super().__init__(format="letter")
        self.set_auto_page_break(auto=True, margin=20)
        self.set_margins(22, 18, 22)

        # Use system Georgia (serif, elegant) + Verdana (sans, readable)
        FONTS = "/System/Library/Fonts/Supplemental"
        self.add_font("Georgia", "", os.path.join(FONTS, "Georgia.ttf"))
        self.add_font("Georgia", "B", os.path.join(FONTS, "Georgia Bold.ttf"))
        self.add_font("Verdana", "", os.path.join(FONTS, "Verdana.ttf"))
        self.add_font("Verdana", "B", os.path.join(FONTS, "Verdana Bold.ttf"))

        self.add_page()

    # ── Helpers ───────────────────────────────────────────────────────────

    def _color(self, rgb):
        self.set_text_color(*rgb)

    def _hr(self, y_offset=1):
        self.ln(y_offset)
        y = self.get_y()
        self.set_draw_color(*RULE)
        self.set_line_width(0.3)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(3)

    def section_heading(self, text):
        self.ln(5)
        self._color(ACCENT)
        self.set_font("Georgia", "B", 9.5)
        self.cell(0, 6, text.upper(), new_x="LMARGIN", new_y="NEXT")
        self._hr(1)

    def job_header(self, title, company_team, dates):
        self._color(BLACK)
        self.set_font("Verdana", "B", 10)
        self.cell(0, 5.5, title, new_x="LMARGIN", new_y="NEXT")

        y = self.get_y()
        self._color(DARK)
        self.set_font("Verdana", "", 9)
        self.cell(0, 5, company_team)
        self._color(MID)
        self.set_font("Verdana", "", 8.5)
        self.set_xy(self.w - self.r_margin - 45, y)
        self.cell(45, 5, dates, align="R")
        self.set_xy(self.l_margin, y + 5)
        self.ln(1)

    def bullet(self, text):
        x = self.get_x()
        self._color(ACCENT)
        self.set_font("Verdana", "", 8)
        self.cell(5, 4.5, "\u2022")  # bullet char
        self._color(DARK)
        self.set_font("Verdana", "", 9)
        self.multi_cell(self.w - self.r_margin - x - 5, 4.5, text)
        self.ln(0.5)

    def tag_row(self, tags):
        self.ln(1)
        self._color(MID)
        self.set_font("Verdana", "", 7.5)
        self.cell(0, 4, "  \u00B7  ".join(tags), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)


def build():
    pdf = ResumePDF()

    # ══════════════════════════════════════════════════════════════════════
    # HEADER
    # ══════════════════════════════════════════════════════════════════════
    pdf._color(BLACK)
    pdf.set_font("Georgia", "B", 24)
    pdf.cell(0, 10, "Scott Ivan", new_x="LMARGIN", new_y="NEXT")

    pdf._color(ACCENT)
    pdf.set_font("Verdana", "", 10)
    pdf.cell(0, 5.5, "Platform Engineer  |  DevSecOps  |  Cloud Native", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(2)
    pdf._color(MID)
    pdf.set_font("Verdana", "", 8.5)
    contact_line = "scottivan.com   \u00B7   github.com/scottivn   \u00B7   linkedin.com/in/scott-ivan-4a2905134"
    pdf.cell(0, 4.5, contact_line, new_x="LMARGIN", new_y="NEXT")

    pdf._hr(3)

    # ══════════════════════════════════════════════════════════════════════
    # SUMMARY
    # ══════════════════════════════════════════════════════════════════════
    pdf._color(DARK)
    pdf.set_font("Verdana", "", 9)
    summary = (
        "Platform engineer with 6+ years building and operating enterprise Kubernetes infrastructure at USAA. "
        "Transitioned from on-premises OpenShift to leading EKS platform engineering, designing a three-tier "
        "cluster management architecture with Argo CD. CKA certified with a Machine Learning certificate from "
        "Cornell University. Builder of PatientSynapse \u2014 an AI-powered HIPAA-compliant workflow automation "
        "platform for healthcare. Passionate about GitOps, policy-as-code, and developer platforms."
    )
    pdf.multi_cell(0, 4.5, summary)

    # ══════════════════════════════════════════════════════════════════════
    # EXPERIENCE
    # ══════════════════════════════════════════════════════════════════════
    pdf.section_heading("Experience")

    # Role 1
    pdf.job_header(
        "Platform Engineer \u2014 DevSecOps",
        "USAA  \u00B7  EKS / DevSecRegOps Team",
        "2025 \u2013 Present",
    )
    pdf.bullet(
        "Architecting a three-tier EKS cluster management platform using Argo CD for cluster "
        "syncs and lifecycle management across enterprise environments"
    )
    pdf.bullet(
        "Building GitOps-driven infrastructure pipelines for multi-cluster governance with "
        "automated drift detection and reconciliation"
    )
    pdf.bullet(
        "Designing DevSecOps-native workflows integrating security scanning, policy enforcement, "
        "and automated compliance checks into CI/CD"
    )
    pdf.bullet(
        "Leading shift-left security practices with OPA/Kyverno policy-as-code for cluster "
        "governance and admission control"
    )
    pdf.tag_row(["EKS", "Argo CD", "Kubernetes", "Terraform", "GitOps", "OPA", "Kyverno"])

    pdf.ln(2)

    # Role 2
    pdf.job_header(
        "Platform Engineer \u2014 Containers as a Service",
        "USAA  \u00B7  OpenShift / On-Prem Cloud Team",
        "2019 \u2013 2025",
    )
    pdf.bullet(
        "Built and managed enterprise-scale OpenShift clusters across on-premises data centers "
        "supporting hundreds of application teams"
    )
    pdf.bullet(
        "Automated cluster provisioning, day-2 operations, and lifecycle management at scale "
        "using Ansible and custom Python tooling"
    )
    pdf.bullet(
        "Developed internal tooling for cluster monitoring, alerting, and self-service developer "
        "workflows reducing onboarding time"
    )
    pdf.bullet(
        "Collaborated cross-functionally to migrate workloads to containerized infrastructure, "
        "improving deployment velocity and resource utilization"
    )
    pdf.tag_row(["OpenShift", "Kubernetes", "Ansible", "Python", "Helm", "Prometheus", "Grafana"])

    pdf.ln(2)

    # Role 3
    pdf.job_header(
        "Teaching Assistant \u2014 Computer Science",
        "University  \u00B7  Data Structures & Algorithms",
        "2017 \u2013 2019",
    )
    pdf.bullet(
        "TA for introductory and intermediate CS courses covering data structures, algorithms, "
        "and object-oriented programming"
    )
    pdf.bullet(
        "Led weekly lab sessions, office hours, and code reviews for 30+ students per semester"
    )

    # ══════════════════════════════════════════════════════════════════════
    # PROJECTS
    # ══════════════════════════════════════════════════════════════════════
    pdf.section_heading("Projects")

    pdf._color(BLACK)
    pdf.set_font("Verdana", "B", 10)
    pdf.cell(60, 5.5, "PatientSynapse")
    pdf._color(MID)
    pdf.set_font("Verdana", "", 8.5)
    pdf.cell(0, 5.5, "patientsynapse.com", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

    pdf.bullet(
        "Full-stack AI automation platform for a sleep medicine practice \u2014 automates the "
        "fax-to-EMR pipeline: inbound faxes are OCR\u2019d, run through an LLM extraction layer, "
        "matched to FHIR R4 patient records, and pushed directly into the EMR"
    )
    pdf.bullet(
        "HIPAA-compliant audit logging, JWT + SMART on FHIR OAuth2, RBAC with role-scoped UI "
        "and backend guards"
    )
    pdf.bullet(
        "Manages DME/CPAP supply lifecycle, HMO referral authorization tracking, and insurance "
        "allowable rate lookups"
    )
    pdf.bullet(
        "Deployed on AWS EC2 behind nginx with Let\u2019s Encrypt TLS and AWS Secrets Manager "
        "for credential injection"
    )
    pdf.tag_row(["FastAPI", "React", "PostgreSQL", "FHIR R4", "LLMs", "OCR", "AWS", "JWT/RBAC"])

    # ══════════════════════════════════════════════════════════════════════
    # TECHNICAL SKILLS
    # ══════════════════════════════════════════════════════════════════════
    pdf.section_heading("Technical Skills")

    skills = {
        "Cloud & Orchestration": "Kubernetes, EKS, OpenShift, Helm, Kustomize",
        "GitOps & CD": "Argo CD, Argo Workflows, FluxCD, GitHub Actions",
        "DevSecOps": "OPA, Kyverno, SAST/DAST pipelines, Policy-as-Code",
        "IaC & Automation": "Terraform, Ansible, CloudFormation, Python, Go",
        "Observability": "Prometheus, Grafana, OpenTelemetry, Loki",
        "Languages": "Python, Go, Bash, TypeScript",
    }

    for category, items in skills.items():
        pdf._color(DARK)
        pdf.set_font("Verdana", "B", 8.5)
        pdf.cell(38, 4.5, category)
        pdf._color(MID)
        pdf.set_font("Verdana", "", 8.5)
        pdf.cell(0, 4.5, items, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(0.5)

    # ══════════════════════════════════════════════════════════════════════
    # CERTIFICATIONS
    # ══════════════════════════════════════════════════════════════════════
    pdf.section_heading("Certifications")

    for cert, org, year in [
        ("Certified Kubernetes Administrator (CKA)", "Cloud Native Computing Foundation (CNCF)", "2023"),
        ("Machine Learning Certificate", "Cornell University", "2023"),
    ]:
        pdf._color(BLACK)
        pdf.set_font("Verdana", "B", 9)
        pdf.cell(100, 4.5, cert)
        pdf._color(MID)
        pdf.set_font("Verdana", "", 8.5)
        y = pdf.get_y()
        pdf.set_xy(pdf.w - pdf.r_margin - 20, y)
        pdf.cell(20, 4.5, year, align="R")
        pdf.set_xy(pdf.l_margin, y + 4.5)
        pdf._color(LIGHT)
        pdf.set_font("Verdana", "", 8)
        pdf.cell(0, 4, org, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1.5)

    # ══════════════════════════════════════════════════════════════════════
    # EDUCATION
    # ══════════════════════════════════════════════════════════════════════
    pdf.section_heading("Education")

    pdf._color(BLACK)
    pdf.set_font("Verdana", "B", 9)
    pdf.cell(0, 5, "B.A., Computer and Programming Sciences", new_x="LMARGIN", new_y="NEXT")
    pdf._color(DARK)
    pdf.set_font("Verdana", "", 8.5)
    pdf.cell(0, 4.5, "Minor in Mathematics", new_x="LMARGIN", new_y="NEXT")
    pdf._color(LIGHT)
    pdf.set_font("Verdana", "", 8)
    pdf.cell(0, 4, "Teaching Assistant \u2014 Data Structures & Algorithms", new_x="LMARGIN", new_y="NEXT")

    # ── Save ─────────────────────────────────────────────────────────────
    os.makedirs(OUT_DIR, exist_ok=True)
    pdf.output(OUT_PATH)
    print(f"Resume saved to {OUT_PATH}")


if __name__ == "__main__":
    build()
