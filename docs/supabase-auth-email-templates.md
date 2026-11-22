# FIXGAD — قوالب إيميلات الحساب والأمان بالدارجة المغربية

هاد القوالب موجدين باش تنسخهم فـ Supabase Dashboard → Authentication → Email Templates. حفظ هاد الملف فـ GitHub ما كيبدلش القوالب بوحدو فـ Supabase؛ خاصك تلصق كل قالب فبلاصتو فالداشبورد.

## الهوية ديال الإيميلات

- الاسم اللي كيبان للناس: FIXGAD
- الإيميل: notifications@fixgad.app (من بعد ما يكون SMTP ديال Supabase مربوط بمرسل موثّق)
- الدعم: support@fixgad.tech
- الموقع: https://fixgad.app
- اللغة: الدارجة المغربية بالحروف العربية، واتجاه الكتابة RTL.
- خليك ديما مستعمل `{{ .ConfirmationURL }}` فالروابط الآمنة. ما تستعملش localhost وما تركّبش الرابط يدوياً.
- طفي click tracking فإيميلات تسجيل الدخول واسترجاع كلمة السر باش الروابط الآمنة ما تتبدلش.

**الستايل:** أخضر غامق `#173D32`، خلفية فاتحة `#F4F6F3`، كارت بيضاء، زر واضح، وملاحظة أمان مفهومة.

---

## 1. تأكيد الإيميل (Confirm signup)

**Subject:** مرحبا بيك فـ FIXGAD! أكد لينا الإيميل ديالك

```html
<!doctype html><html lang="ary" dir="rtl"><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px;direction:rtl">
<table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;letter-spacing:1px;color:#173d32;direction:ltr;text-align:right">FIXGAD</div>
<p style="color:#718078;font-size:12px">مرحبا بيك معانا</p>
<h1 style="font-size:25px;color:#173d32">أكد لينا الإيميل ديالك</h1>
<p>سلام{{ if .Data.full_name }} {{ .Data.full_name }}{{ end }}،</p>
<p>شكراً حيث تسجلتي فـ FIXGAD! باش نكملو تأكيد الحساب ديالك ونتأكدو أن هاد الإيميل ديالك، كليكي على الزر اللي لتحت.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold;display:inline-block">أكد الإيميل ديالي</a></p>
<p style="font-size:13px;color:#64736b">إلا ما كنتيش نتا اللي درتي هاد التسجيل، تقدر تتجاهل هاد الرسالة.</p>
<p style="margin-top:28px">تحياتنا،<br><strong>فريق FIXGAD</strong></p>
<hr style="border:0;border-top:1px solid #e8eee9;margin-top:24px"><p style="font-size:12px;color:#718078">عندك شي سؤال؟ تواصل معانا: <a href="mailto:support@fixgad.tech" style="color:#173d32">support@fixgad.tech</a></p>
</td></tr></table></body></html>
```

## 2. تبديل كلمة السر (Reset password)

**Subject:** طلبتي تبدل كلمة السر ديال FIXGAD

```html
<!doctype html><html lang="ary" dir="rtl"><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px;direction:rtl"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><p style="color:#718078;font-size:12px">أمان الحساب</p>
<h1 style="font-size:25px;color:#173d32">نعاونوك ترجع لحسابك</h1>
<p>توصلنا بطلب باش تبدل كلمة السر ديال حساب FIXGAD ديالك.</p>
<p>كليكي على الزر باش تختار كلمة سر جديدة. هاد الرابط خاص بيك، ما تشاركو مع حتى واحد.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold;display:inline-block">بدل كلمة السر</a></p>
<p style="font-size:13px;color:#64736b">إلا ما طلبتيش تبدل كلمة السر، تجاهل هاد الإيميل. كلمة السر الحالية ديالك غاتبقى كيف ما هي.</p>
<p>تحياتنا،<br><strong>فريق FIXGAD</strong></p><hr style="border:0;border-top:1px solid #e8eee9;margin-top:24px"><p style="font-size:12px;color:#718078">محتاج المساعدة؟ <a href="mailto:support@fixgad.tech" style="color:#173d32">support@fixgad.tech</a></p></td></tr></table></body></html>
```

## 3. رابط الدخول (Magic link)

**Subject:** رابط الدخول الآمن ديالك لـ FIXGAD

```html
<!doctype html><html lang="ary" dir="rtl"><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px;direction:rtl"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">دخل لحسابك بأمان</h1>
<p>هادا هو الرابط الخاص باش تدخل لحساب FIXGAD ديالك. الرابط كيستعمل غير مرة وحدة، وخاصك تخليه سري.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold;display:inline-block">دخل لـ FIXGAD</a></p>
<p style="font-size:13px;color:#64736b">إلا ما طلبتيش هاد الرابط، تقدر تتجاهل الإيميل.</p><p>تحياتنا،<br><strong>فريق FIXGAD</strong></p><p style="font-size:12px;color:#718078">الدعم: support@fixgad.tech</p></td></tr></table></body></html>
```

## 4. دعوة للانضمام (Invite user)

**Subject:** عندك دعوة باش تنضم لـ FIXGAD

```html
<!doctype html><html lang="ary" dir="rtl"><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px;direction:rtl"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">مرحبا، عندك دعوة!</h1>
<p>شي واحد من فريق FIXGAD صيفط ليك دعوة باش تنشئ الحساب ديالك ولا تدخل ليه.</p><p>كليكي على الزر باش تكمل باستعمال الرابط الآمن.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold;display:inline-block">قبل الدعوة</a></p>
<p style="font-size:13px;color:#64736b">إلا ما كنتيش كتسنى هاد الدعوة، تواصل مع الدعم قبل ما تكمل.</p><p>فريق FIXGAD · support@fixgad.tech</p></td></tr></table></body></html>
```

## 5. تأكيد تغيير الإيميل (Change email address)

**Subject:** أكد الإيميل الجديد ديالك فـ FIXGAD

```html
<!doctype html><html lang="ary" dir="rtl"><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px;direction:rtl"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">أكد تغيير الإيميل</h1>
<p>طلبتي تبدل الإيميل المرتابط بحساب FIXGAD ديالك لهاد العنوان: <strong>{{ .NewEmail }}</strong>.</p><p>كليكي على الزر باش تأكد هاد التغيير.</p>
<p style="margin:28px 0"><a href="{{ .ConfirmationURL }}" style="background:#173d32;color:#fff;text-decoration:none;padding:14px 22px;border-radius:8px;font-weight:bold;display:inline-block">أكد الإيميل الجديد</a></p>
<p style="font-size:13px;color:#64736b">إلا ما طلبتيش هاد التغيير، ما تكليكيش على الزر وتواصل معانا بسرعة عبر support@fixgad.tech.</p><p>فريق FIXGAD</p></td></tr></table></body></html>
```

## 6. كود التأكد من الهوية (Reauthentication)

**Subject:** كود الأمان ديالك فـ FIXGAD: {{ .Token }}

```html
<!doctype html><html lang="ary" dir="rtl"><body style="margin:0;background:#f4f6f3;font-family:Arial,sans-serif;color:#17211d;padding:28px 12px;direction:rtl"><table role="presentation" width="100%" style="max-width:580px;margin:auto;background:#fff;border-radius:16px;padding:32px"><tr><td>
<div style="font-size:22px;font-weight:800;color:#173d32">FIXGAD</div><h1 style="font-size:25px;color:#173d32">أكد لينا بلي نتا صاحب الحساب</h1>
<p>استعمل هاد الكود باش تكمل العملية اللي طلبتي فالحساب ديالك.</p>
<div style="margin:24px 0;padding:18px;background:#f4f6f3;border-radius:10px;text-align:center;font-size:30px;font-weight:800;letter-spacing:8px;color:#173d32;direction:ltr">{{ .Token }}</div>
<p style="font-size:13px;color:#64736b">ما تعطي هاد الكود لحتى واحد، حتى إلا قال ليك راه من فريق FIXGAD. إلا ما طلبتيهش، تواصل مع الدعم.</p><p>فريق FIXGAD · support@fixgad.tech</p></td></tr></table></body></html>
```

---

## إيميلات التنبيهات الأمنية

فعّل التنبيه المناسب من إعدادات Supabase. هاد الإيميلات كيعلموك بالتغييرات اللي وقعات فالحساب ديالك.

### 7. تبدلات كلمة السر

**Subject:** تنبيه أمني: تبدلات كلمة السر ديال FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">كلمة السر ديالك تبدلات</h2><p>كلمة السر ديال حساب FIXGAD ديالك تبدلات مؤخراً.</p><p>إلا كنت نتا اللي درتي هاد التغيير، ما خاصك دير والو. إلا ما عرفتيش هاد العملية، بدل كلمة السر ديالك دابا وتواصل معانا عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

### 8. تبدل الإيميل

**Subject:** تنبيه أمني: تبدل الإيميل ديال حساب FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">الإيميل ديال الحساب تبدل</h2><p>الإيميل المرتابط بحساب FIXGAD تبدل من <strong>{{ .OldEmail }}</strong> لـ <strong>{{ .Email }}</strong>.</p><p>إلا كنت نتا اللي درتي هاد التغيير، ما خاصك دير والو. إلا ما عرفتيهش، تواصل معانا فوراً عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

### 9. تبدل رقم الهاتف

**Subject:** تنبيه أمني: تبدل رقم الهاتف ديالك فـ FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">رقم الهاتف ديالك تبدل</h2><p>رقم الهاتف المرتابط بحساب FIXGAD تبدل من <strong>{{ .OldPhone }}</strong> لـ <strong>{{ .Phone }}</strong>.</p><p>إلا ما كنتيش نتا اللي درتي هاد التغيير، تواصل معانا فوراً عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

### 10. تزادت طريقة جديدة للدخول

**Subject:** تنبيه أمني: تزادت طريقة جديدة للدخول لحساب FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">تزادت طريقة جديدة للدخول</h2><p>طريقة الدخول <strong>{{ .Provider }}</strong> تزادت لحساب FIXGAD ديالك المرتابط بهاد الإيميل: {{ .Email }}.</p><p>إلا ما درتيش هاد العملية، تواصل معانا فوراً عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

### 11. تحيدات طريقة الدخول

**Subject:** تنبيه أمني: تحيدات طريقة دخول من حساب FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">تحيدات طريقة للدخول</h2><p>طريقة الدخول <strong>{{ .Provider }}</strong> تحيدات من حساب FIXGAD ديالك المرتابط بهاد الإيميل: {{ .Email }}.</p><p>إلا ما درتيش هاد العملية، تواصل معانا فوراً عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

### 12. تزادت وسيلة للتحقق

**Subject:** تنبيه أمني: تزادت وسيلة جديدة للتحقق فـ FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">تزادت وسيلة للتحقق من الهوية</h2><p>وسيلة التحقق <strong>{{ .FactorType }}</strong> تزادت لحساب FIXGAD ديالك.</p><p>إلا ما كنتيش نتا اللي درتي هاد التغيير، تواصل معانا فوراً عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

### 13. تحيدات وسيلة التحقق

**Subject:** تنبيه أمني: تحيدات وسيلة التحقق من FIXGAD

```html
<div dir="rtl" lang="ary" style="font-family:Arial,sans-serif;color:#17211d"><h2 style="color:#173d32">تحيدات وسيلة التحقق</h2><p>وسيلة التحقق <strong>{{ .FactorType }}</strong> تحيدات من حساب FIXGAD ديالك.</p><p>إلا ما كنتيش نتا اللي درتي هاد التغيير، تواصل معانا فوراً عبر <a href="mailto:support@fixgad.tech">support@fixgad.tech</a>.</p><p>فريق الأمان ديال FIXGAD</p></div>
```

---

## شنو خاصك تدير فـ Supabase

1. دخل لـ **Authentication → Email Templates**.
2. بدل Subject وHTML ديال كل قالب بالقالب المقابل ليه هنا.
3. فـ Security Notifications، فعّل التنبيهات اللي بغيتي تبعث للمستخدمين.
4. خليهوم كاملين بنفس اسم المرسل **FIXGAD** واستعمل عنوان إرسال موثّق.
5. تأكد Site URL هو `https://fixgad.app` وزيد `https://fixgad.app/reset-password` فالـ Redirect URLs.
6. جرّب تأكيد الحساب، استرجاع كلمة السر، تغيير الإيميل، وتنبيه أمني قبل الإطلاق.

**مهم:** إيميل التسجيل فالولوج المبكر منفصل على قوالب Supabase Auth. كيتصيفط من API ديال FIXGAD من بعد ما يتسجل الطلب بنجاح فقاعدة البيانات.
