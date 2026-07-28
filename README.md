# Genset Guardian : Generator Monitoring Dashboard

A UI/UX prototype for real time generator fleet monitoring, built for Perennial Technologies to explore reducing vendor dependency on third party remote monitoring platforms.

**Live prototype:** https://genset-guardian-watch.lovable.app/

## Overview

Perennial Technologies manages a fleet of diesel generators deployed across client sites in India. This prototype models what an in house remote monitoring and control platform could look like, covering live fleet status, alerting, remote commands, maintenance scheduling, and operational analytics in a single interface.

The prototype was presented to engineering leadership at Perennial, who responded positively and expressed interest in taking the concept forward.

## Features

* **Dashboard:** fleet wide summary of total units online, active power output, active alerts, and system wide efficiency
* **Fleet:** live cards per generator (power output, load, temperature, voltage, oil pressure, fuel and coolant levels) with remote start/stop controls
* **Commands:** a remote command center for start/stop/restart actions across the fleet, with an execution log of recent commands and their status
* **Alerts:** alert management with severity levels (critical/warning/info), an acknowledge and resolve workflow, and filtering
* **Maintenance:** maintenance scheduling and calendar view, with overdue and due soon tracking per generator
* **Analytics:** fleet availability, average efficiency, fuel cost per kWh, and MTBF, with charts for fuel consumption, costs, utilization, and maintenance costs over time
* **Settings:** configurable alert rules and thresholds (for example, low fuel percentage, high temperature in Celsius), notification preferences (email and SMS)

## How it was built

This prototype was built using **Lovable**, an AI assisted app builder, through iterative prompting rather than hand written frontend code. The focus of this project was translating real operational requirements (from hands on generator commissioning and IoT monitoring work) into a coherent, interactive product design covering information architecture, UX flows, and data modeling, rather than backend implementation.

## Status

This is a **UI/UX prototype**. All data shown (generator readings, alert history, command logs) is mock/sample data for demonstration purposes; it is not connected to live hardware or a real backend. Buttons and navigation are functional within the app's own state.

## Background

Built as part of hands-on work at Perennial Technologies, alongside industrial training on 250 kVA diesel generator commissioning and IoT monitoring device integration (DATA OMS, SGC-120 controller).



Built as part of hands-on work at Perennial Technologies, alongside industrial training on 250 kVA diesel generator commissioning and IoT monitoring device integration (DATA OMS, SGC-120 controller).
