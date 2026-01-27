# إعداد EmailJS لإرسال الرسائل

## الخطوات:

### 1. إنشاء حساب في EmailJS
- اذهب إلى https://www.emailjs.com/
- سجل حساب مجاني
- بعد التسجيل، ستجد Dashboard

### 2. إعداد Email Service
- من Dashboard، اذهب إلى **Email Services**
- اختر **Add New Service**
- اختر مزود البريد الإلكتروني (Gmail, Outlook, etc.)
- اتبع التعليمات لإضافة حسابك البريد الإلكتروني
- احفظ **Service ID**

### 3. إنشاء Email Template
- اذهب إلى **Email Templates**
- اضغط **Create New Template**
- استخدم المتغيرات التالية في القالب:
  - `{{from_name}}` - اسم المرسل
  - `{{from_email}}` - بريد المرسل
  - `{{message}}` - الرسالة
  - `{{to_email}}` - بريدك الإلكتروني
- مثال للقالب:
  ```
  Subject: رسالة جديدة من {{from_name}}
  
  من: {{from_name}}
  البريد الإلكتروني: {{from_email}}
  
  الرسالة:
  {{message}}
  ```
- احفظ **Template ID**

### 4. الحصول على Public Key
- اذهب إلى **Account** > **General**
- انسخ **Public Key**

### 5. إضافة المتغيرات إلى المشروع
- أنشئ ملف `.env` في جذر المشروع
- أضف المتغيرات التالية:
  ```
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  VITE_EMAILJS_PUBLIC_KEY=your_public_key
  ```

### 6. تثبيت المكتبة
```bash
npm install @emailjs/browser
```

### 7. تحديث الكود
- افتح `src/components/Contact.tsx`
- الكود جاهز بالفعل! فقط تأكد من أن المتغيرات في `.env` صحيحة

## ملاحظات:
- الحساب المجاني يسمح بـ 200 رسالة شهرياً
- إذا لم تقم بإعداد EmailJS، سيتم استخدام `mailto:` كبديل
- تأكد من عدم رفع ملف `.env` إلى GitHub (يجب أن يكون في `.gitignore`)
