└── src
    ├── app
    │   ├── App.jsx
    │   ├── auth
    │   │   ├── AuthGuard.jsx
    │   │   └── authRoles.js
    │   ├── components
    │   │   ├── Brand.jsx
    │   │   ├── Breadcrumb.jsx
    │   │   ├── ChatAvatar.jsx
    │   │   ├── ChatHead.jsx
    │   │   ├── Chatbox.jsx
    │   │   ├── ConfirmationDialog.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Loadable.jsx
    │   │   ├── MatxCustomizer
    │   │   │   ├── BadgeSelected.jsx
    │   │   │   ├── Layout1Customizer.jsx
    │   │   │   ├── MatxCustomizer.jsx
    │   │   │   └── customizerOptions.js
    │   │   ├── MatxLayout
    │   │   │   ├── Layout1
    │   │   │   │   ├── Layout1.jsx
    │   │   │   │   ├── Layout1Settings.js
    │   │   │   │   ├── Layout1Sidenav.jsx
    │   │   │   │   └── Layout1Topbar.jsx
    │   │   │   ├── MatxLayout.jsx
    │   │   │   ├── index.js
    │   │   │   └── settings.js
    │   │   ├── MatxLoading.jsx
    │   │   ├── MatxLogo.jsx
    │   │   ├── MatxMenu.jsx
    │   │   ├── MatxProgressBar.jsx
    │   │   ├── MatxSearchBox.jsx
    │   │   ├── MatxSidenav
    │   │   │   └── MatxSidenav.jsx
    │   │   ├── MatxSuspense.jsx
    │   │   ├── MatxTheme
    │   │   │   ├── EchartTheme.jsx
    │   │   │   ├── MatxTheme.jsx
    │   │   │   ├── SecondarySidenavTheme
    │   │   │   │   └── SecondarySidenavTheme.jsx
    │   │   │   ├── SidenavTheme
    │   │   │   │   └── SidenavTheme.jsx
    │   │   │   ├── components.js
    │   │   │   ├── initThemes.js
    │   │   │   ├── themeColors.js
    │   │   │   └── themeOptions.js
    │   │   ├── MatxVerticalNav
    │   │   │   ├── MatxVerticalNav.jsx
    │   │   │   └── MatxVerticalNavExpansionPanel.jsx
    │   │   ├── NotificationBar
    │   │   │   └── NotificationBar.jsx
    │   │   ├── SecondarySidebar
    │   │   │   ├── SecondarySidebar.jsx
    │   │   │   ├── SecondarySidebarContent.jsx
    │   │   │   └── SecondarySidebarToggle.jsx
    │   │   ├── ShoppingCart.jsx
    │   │   ├── Sidenav.jsx
    │   │   ├── SimpleCard.jsx
    │   │   ├── Typography.jsx
    │   │   └── index.js
    │   ├── contexts
    │   │   ├── JWTAuthContext.js
    │   │   ├── NotificationContext.js
    │   │   └── SettingsContext.js
    │   ├── hooks
    │   │   ├── useAuth.js
    │   │   ├── useNotification.js
    │   │   └── useSettings.js
    │   ├── navigations.js
    │   ├── routes.jsx
    │   ├── utils
    │   │   ├── constant.js
    │   │   └── utils.js
    │   └── views
    │       ├── charts
    │       │   └── echarts
    │       │       ├── AdvanceAreaChart.jsx
    │       │       ├── AppEchart.jsx
    │       │       ├── AreaChart.jsx
    │       │       ├── ComparisonChart.jsx
    │       │       ├── Doughnut.jsx
    │       │       └── LineChart.jsx
    │       ├── dashboard
    │       │   ├── Analytics.jsx
    │       │   └── shared
    │       │       ├── Doughnut.jsx
    │       │       ├── ModifiedAreaChart.jsx
    │       │       ├── RowCards.jsx
    │       │       ├── StatCards.jsx
    │       │       ├── StatCards2.jsx
    │       │       ├── TopSellingTable.jsx
    │       │       └── UpgradeCard.jsx
    │       ├── material-kit
    │       │   ├── AppProgress.jsx
    │       │   ├── DatePicker.jsx
    │       │   ├── MaterialRoutes.js
    │       │   ├── auto-complete
    │       │   │   ├── AppAutoComplete.jsx
    │       │   │   ├── AsyncAutocomplete.jsx
    │       │   │   ├── AutocompleteCombo.jsx
    │       │   │   ├── BadgeAutocomplete.jsx
    │       │   │   └── LocationAutocomplete.jsx
    │       │   ├── buttons
    │       │   │   └── AppButton.jsx
    │       │   ├── checkbox
    │       │   │   ├── AppCheckbox.jsx
    │       │   │   ├── FormGroupCheckbox.jsx
    │       │   │   ├── LabelledCheckbox.jsx
    │       │   │   ├── PlacingCheckboxLabel.jsx
    │       │   │   └── SimpleCheckbox.jsx
    │       │   ├── dialog
    │       │   │   ├── AppDialog.jsx
    │       │   │   ├── ConfirmationDialog.jsx
    │       │   │   ├── CustomizedDialog.jsx
    │       │   │   ├── DialogTransition.jsx
    │       │   │   ├── FormDialog.jsx
    │       │   │   ├── FullScreenDialog.jsx
    │       │   │   ├── OptimalSizeDialog.jsx
    │       │   │   ├── ResponsiveDialog.jsx
    │       │   │   ├── SimpleAlerts.jsx
    │       │   │   └── SimpleDialog.jsx
    │       │   ├── expansion-panel
    │       │   │   ├── AppExpansionPanel.jsx
    │       │   │   ├── ControlledAccordion.jsx
    │       │   │   ├── CustomizedExpansionPanel.jsx
    │       │   │   ├── DetailedExpansionPanel.jsx
    │       │   │   └── SimpleExpansionPanel.jsx
    │       │   ├── forms
    │       │   │   ├── AppForm.jsx
    │       │   │   └── SimpleForm.jsx
    │       │   ├── icons
    │       │   │   └── AppIcon.jsx
    │       │   ├── menu
    │       │   │   ├── AppMenu.jsx
    │       │   │   ├── CustomizedMenu.jsx
    │       │   │   ├── MaxHeightMenu.jsx
    │       │   │   ├── SelectedMenu.jsx
    │       │   │   └── SimpleMenu.jsx
    │       │   ├── radio
    │       │   │   ├── AppRadio.jsx
    │       │   │   ├── PlacingRadioLabel.jsx
    │       │   │   ├── SimpleRadio.jsx
    │       │   │   └── StandaloneRadio.jsx
    │       │   ├── slider
    │       │   │   ├── AppSlider.jsx
    │       │   │   ├── ContinuousSlider.jsx
    │       │   │   ├── CustomizedSlider.jsx
    │       │   │   ├── DiscreteSlider.jsx
    │       │   │   ├── InputSlider.jsx
    │       │   │   ├── RangeSlider.jsx
    │       │   │   └── VerticalSlider.jsx
    │       │   ├── snackbar
    │       │   │   ├── AppSnackbar.jsx
    │       │   │   ├── ConsecutiveSnackbar.jsx
    │       │   │   ├── CustomizedSnackbar.jsx
    │       │   │   ├── DirectionSnackbar.jsx
    │       │   │   ├── LongLengthSnackbar.jsx
    │       │   │   ├── PositionedSnackbar.jsx
    │       │   │   ├── SimpleSnackbar.jsx
    │       │   │   ├── StackedSnackbar.jsx
    │       │   │   └── TransitionSnackbar.jsx
    │       │   ├── switch
    │       │   │   ├── AppSwitch.jsx
    │       │   │   ├── CustomizedSwitch.jsx
    │       │   │   ├── FormGroupSwitch.jsx
    │       │   │   ├── LabelledSwitch.jsx
    │       │   │   ├── PlacingSwitchLabel.jsx
    │       │   │   └── SijmpleSwitch.jsx
    │       │   └── tables
    │       │       ├── AppTable.jsx
    │       │       ├── PaginationTable.jsx
    │       │       └── SimpleTable.jsx
    │       └── sessions
    │           ├── ForgotPassword.jsx
    │           ├── JwtLogin.jsx
    │           └── JwtRegister.jsx
    ├── fake-db
    │   ├── db
    │   │   ├── auth.js
    │   │   ├── ecommerce.js
    │   │   └── notification.js
    │   ├── index.js
    │   └── mock.js
    ├── index.jsx
    └── serviceWorker.js