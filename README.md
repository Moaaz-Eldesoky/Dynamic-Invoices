# DynamicInvoices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Structure of the App

1. Authentication Component:
Purpose: Manage user authentication and authorization.
Components:
LoginComponent
RegisterComponent
Services:
AuthService (for handling user authentication)
2. Dashboard Component:
Purpose: Display an overview of the user's data and key metrics.
Components:
DashboardComponent
Services:
DashboardService (for fetching and displaying dashboard data)
3. Invoice Upload Component:
Purpose: Allow users to upload their invoices.
Components:
InvoiceUploadComponent
Services:
FileUploadService (for handling file uploads)
4. Invoice Management Component:(Merged with the prev component)
Purpose: Manage and view uploaded invoices.
Components:
InvoiceManagementComponent
InvoiceDetailsComponent (for viewing individual invoices)
Services:
InvoiceService (for fetching and managing invoices)
5. Currency Exchange Rate Component:   ----will be displayed on the header
Purpose: Display and manage daily currency exchange rates.
Components:
ExchangeRateComponent
Services:
ExchangeRateService (for fetching and managing exchange rates)
6. Product Price Adjustment Component:
Purpose: Allow users to adjust product prices based on the exchange rate.
Components:
PriceAdjustmentComponent
Services:
PriceAdjustmentService (for calculating adjusted prices)
7. Notification Component:
Purpose: Notify users of changes in exchange rates or other important updates.
Components:
NotificationComponent
Services:
NotificationService (for handling notifications)
8. User Settings Component:
Purpose: Allow users to configure application settings.
Components:
UserSettingsComponent
Services:
UserSettingsService (for managing user-specific settings)
9. Data Storage Service:
Purpose: Manage the storage and retrieval of data (invoices, user settings, etc.).
Services:
DataService (for handling CRUD operations on various data)
10. API Service:
Purpose: Communicate with external APIs, such as fetching exchange rates.
Services:
ApiService (for handling HTTP requests)
11. Error Handling Service:
Purpose: Centralized error handling and logging.
Services:
ErrorHandlingService
12. AuthGuard Service:
Purpose: Secure routes based on user authentication status.
Services:
AuthGuardService
13. Interceptor Service:
Purpose: Intercept HTTP requests to add authentication headers or handle errors.
Services:
InterceptorService
14. Utilities Service:
Purpose: Include utility functions or helper methods.
Services:
UtilsService
Notes:
Routing: Configure Angular routing to navigate between different components.
Forms: Utilize Angular forms (either template-driven or reactive) for user interactions.
CSS Framework: Consider using a CSS framework like Bootstrap or Angular Material for styling.
Remember, this is a comprehensive breakdown, and your actual implementation may vary based on the specific requirements and complexities of your project. It's also crucial to follow best practices, such as organizing code into modules, testing components and services, and optimizing for performance.
