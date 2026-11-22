# FIXGAD — Supabase Auth Email Templates

These are branded copy/paste templates for Supabase Dashboard → Authentication → Email Templates. They are not automatically applied to the hosted project by committing this file.

**Brand settings**
- Sender name: FIXGAD
- Sender address: notifications@fixgad.app (only after this sender is accepted by the verified sending domain / SMTP configuration)
- Support: support@fixgad.tech
- Website: https://fixgad.app
- Use `{{ .ConfirmationURL }}` for secure action links. Do not hardcode localhost or construct auth links from `{{ .SiteURL }}`.
- Keep email click tracking disabled for authentication messages so single-use links are not rewritten.

Use this shared visual language in every template: deep green `#173D32`, warm off-white `#F4F6F3`, white content panel, clear action button, and a plain-language security note.

## 1. Confirm signup

**Subject:** Welcome to FIXGAD — confirm your email

```html
<!doctype html><html><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px">
<table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px">
<tr><td><div style="font-size:22px;font-weight:800;letter-spacing:1px;color:#173d32">FIXGAD</div>
<p style="color:#718078;font-size:11px;letter-spacing:1px">WELCOME TO FIXGAD</p>
<h1 style="font-size:25px;color:#173d32">Confirm your email address</h1>
<p>Hi{{ if .Data.full_name }} {{ .Data.full_name }}{{ end }},</p>
<p>Thanks for joining FIXGAD. Confirm your email address to help us keep your account secure and make sure we can reach you with important updates.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold">Confirm my email</a></p>
<p style="font-size:13px;color:#64736b">If you didn't create a FIXGAD account, you can ignore this email.</p>
<p style="margin-top:28px">The FIXGAD Team<br><a href="https://fixgad.app" style="color:#173d32">fixgad.app</a></p>
<hr style="border:0;border-top:1px solid #e8eee9;margin-top:24px"><p style="font-size:12px;color:#718078">Questions? <a href="mailto:support@fixgad.tech" style="color:#173d32">support@fixgad.tech</a></p></td></tr></table></body></html>
```

## 2. Reset password

**Subject:** FIXGAD — your password reset link

```html
<!doctype html><html><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;letter-spacing:1px;color:#173d32">FIXGAD</div><p style="color:#718078;font-size:11px;letter-spacing:1px">ACCOUNT SECURITY</p>
<h1 style="font-size:25px;color:#173d32">Let's get you back in.</h1>
<p>We received a request to reset the password for your FIXGAD account.</p>
<p>Choose a new password using the secure button below. This link is personal to you and should not be shared.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold">Reset my password</a></p>
<p style="font-size:13px;color:#64736b">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
<p style="margin-top:28px">The FIXGAD Team</p><hr style="border:0;border-top:1px solid #e8eee9;margin-top:24px"><p style="font-size:12px;color:#718078">Need help? <a href="mailto:support@fixgad.tech" style="color:#173d32">support@fixgad.tech</a></p></td></tr></table></body></html>
```

## 3. Magic link

**Subject:** Your secure FIXGAD sign-in link

```html
<!doctype html><html><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">Sign in securely</h1>
<p>Use the button below to sign in to your FIXGAD account. This link is single-use, so keep it private.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold">Sign in to FIXGAD</a></p>
<p style="font-size:13px;color:#64736b">If you didn't request this link, you can ignore this email.</p><p>The FIXGAD Team</p><p style="font-size:12px;color:#718078">Support: support@fixgad.tech</p></td></tr></table></body></html>
```

## 4. Invite user

**Subject:** You're invited to FIXGAD

```html
<!doctype html><html><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">You've been invited.</h1>
<p>Someone from the FIXGAD team has invited you to create or access your account.</p>
<p>Use the secure invitation link below to continue.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold">Accept invitation</a></p>
<p style="font-size:13px;color:#64736b">If you weren't expecting this invitation, please contact support before proceeding.</p><p>The FIXGAD Team · support@fixgad.tech</p></td></tr></table></body></html>
```

## 5. Change email address

**Subject:** FIXGAD — confirm your new email address

```html
<!doctype html><html><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">Confirm your new email</h1>
<p>You asked to update the email address on your FIXGAD account to <strong>{{ .NewEmail }}</strong>.</p>
<p>Confirm this change using the secure button below.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold">Confirm email change</a></p>
<p style="font-size:13px;color:#64736b">If you didn't request this change, do not click the button. Contact support at support@fixgad.tech.</p><p>The FIXGAD Team</p></td></tr></table></body></html>
```

## 6. Reauthentication code

**Subject:** Your FIXGAD security code: {{ .Token }}

```html
<!doctype html><html><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">Confirm it's you</h1>
<p>Use this security code to continue with your requested account action.</p>
<div style="margin:24px 0;padding:18px;background:#f4f6f3;border-radius:10px;text-align:center;font-size:30px;font-weight:800;letter-spacing:8px;color:#173d32">{{ .Token }}</div>
<p style="font-size:13px;color:#64736b">Never share this code with anyone, including someone claiming to be from FIXGAD. If you didn't request it, contact support.</p><p>The FIXGAD Team · support@fixgad.tech</p></td></tr></table></body></html>
```

## Security notification templates

Enable the matching security notification in Supabase. These templates do not contain action links; they tell the account owner what changed and how to get help.

### 7. Password changed
**Subject:** Security update: your FIXGAD password was changed

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">Your password was changed</h2><p>The password for your FIXGAD account was recently updated.</p><p>If you made this change, no further action is needed. If you don't recognize it, reset your password immediately and contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>The FIXGAD Security Team</p></div>
```

### 8. Email address changed
**Subject:** Security update: your FIXGAD email address changed

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">Your account email was changed</h2><p>The email address on your FIXGAD account changed from <strong>{{ .OldEmail }}</strong> to <strong>{{ .Email }}</strong>.</p><p>If you made this change, no further action is needed. If you don't recognize it, contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a> immediately.</p><p>The FIXGAD Security Team</p></div>
```

### 9. Phone number changed
**Subject:** Security update: your FIXGAD phone number changed

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">Your phone number was changed</h2><p>The phone number on your FIXGAD account changed from <strong>{{ .OldPhone }}</strong> to <strong>{{ .Phone }}</strong>.</p><p>If you don't recognize this change, contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a> immediately.</p><p>The FIXGAD Security Team</p></div>
```

### 10. Sign-in method linked
**Subject:** Security update: a sign-in method was added to FIXGAD

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">A sign-in method was linked</h2><p>The <strong>{{ .Provider }}</strong> sign-in method was linked to your FIXGAD account ({{ .Email }}).</p><p>If you didn't do this, contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a> immediately.</p><p>The FIXGAD Security Team</p></div>
```

### 11. Sign-in method removed
**Subject:** Security update: a sign-in method was removed from FIXGAD

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">A sign-in method was removed</h2><p>The <strong>{{ .Provider }}</strong> sign-in method was removed from your FIXGAD account ({{ .Email }}).</p><p>If you didn't do this, contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a> immediately.</p><p>The FIXGAD Security Team</p></div>
```

### 12. Verification method added
**Subject:** Security update: a verification method was added

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">A verification method was added</h2><p>The <strong>{{ .FactorType }}</strong> verification method was added to your FIXGAD account.</p><p>If you didn't make this change, contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a> immediately.</p><p>The FIXGAD Security Team</p></div>
```

### 13. Verification method removed
**Subject:** Security update: a verification method was removed

```html
<div style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">A verification method was removed</h2><p>The <strong>{{ .FactorType }}</strong> verification method was removed from your FIXGAD account.</p><p>If you didn't make this change, contact <a href="mailto:support@fixgad.tech">support@fixgad.tech</a> immediately.</p><p>The FIXGAD Security Team</p></div>
```

---

## Final dashboard checklist

1. Open **Authentication → Email Templates**.
2. Set each subject and HTML body above in its matching template.
3. For security notifications, enable the relevant notification switches.
4. Keep the sender name as **FIXGAD** and use a verified sender address.
5. Set the Site URL to `https://fixgad.app` and allow `https://fixgad.app/reset-password`.
6. Test confirmation, recovery, email change, and at least one security notification before launch.

**Important:** The early-access registration confirmation is a separate transactional email from this Supabase Auth template collection. It is sent by the FIXGAD registration API after the database confirms a new registration.
