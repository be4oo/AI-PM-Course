# Micro-Teams 2026: Designing AI-Native Software Orgs That Scale

Last verified: 2026-04-17  
Review cadence: quarterly  
Confidence note: this reading synthesizes currently available research references in this repository and should be re-verified as new field evidence appears.

## Why This Reading Exists

Module 12 covers executive AI leadership decisions, but org-design decisions are often under-specified in standard AI curricula. This reading provides a practical bridge from strategy language to operating-model choices.

## Core Models Compared

### 1) Single-Orchestrator Model
- One experienced orchestrator coordinates most agentic delivery.
- Best for early-stage teams optimizing for velocity and low overhead.
- Primary risk: single point of failure and review bottleneck.

### 2) Micro-Team Pod Model
- Small cross-functional pods own a bounded product slice.
- Roles shift from pure implementation toward verification, governance, and release safety.
- Best for teams that need both speed and control at moderate scale.

### 3) Agency-as-a-Service Model
- Internal teams consume a shared AI delivery service layer.
- Strong for organizations with heavy portfolio breadth and strict policy controls.
- Risk: context distance from domain teams and handoff overhead.

## Decision Heuristics

- Choose by risk profile, not by trend:
- High-regulation or high-side-effect contexts need stronger approval and observability ownership.
- High-uncertainty product bets benefit from pod-level iteration speed and fast eval loops.
- If quality incidents are increasing, reduce autonomy and tighten merge/approval boundaries before adding capacity.

## 90-Day Pilot Backbone

### Days 1-30
- Establish baseline DORA metrics and AI overlays.
- Define decision rights, escalation owners, and kill criteria.
- Run one bounded pilot with explicit quality and cost thresholds.

### Days 31-60
- Expand only if quality, drift, and rollback metrics remain within agreed limits.
- Track review latency and defect escape trends at least weekly.
- Collect role-friction findings (handoff delays, ownership gaps).

### Days 61-90
- Decide whether to scale, refine, or roll back based on evidence.
- Publish operating rules that survived real incidents.
- Archive pilot outcomes into changelog/governance docs.

## Required Caveats

- Most public micro-team case data is self-reported and should be treated as directional evidence.
- Transition claims without baseline data are not decision-grade.
- A 90-day plan is an operating experiment, not proof of long-term organizational fitness.
