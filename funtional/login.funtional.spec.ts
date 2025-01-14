import { test, expect } from '@playwright/test';

test('debería redirigir al dashboard al loguearse', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({ status: 200 });
  });

  await page.goto('http://localhost:4200');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:4200/dashboard');
});

test('debería mostrar mensaje de error en login fallido', async ({ page }) => {
  await page.route('**/api/login', async (route) => {
    await route.fulfill({
      status: 401,
      body: JSON.stringify({ message: 'Invalid credentials' })
    });
  });

  await page.goto('http://localhost:4200/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'wrongpassword');
  await page.click('button[type="submit"]');

  const errorMessage = page.locator('text=Invalid credentials');
  await expect(errorMessage).toBeVisible();
});

test('debería verificar la disponibilidad de la página de login', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  
  // Verificar que los elementos principales están presentes
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible(); 
  await expect(submitButton).toBeVisible();

  // Verificar que la página tiene el título correcto
  await expect(page).toHaveTitle(/Login/);
});

test('debería cargar la página de login en un tiempo razonable', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('http://localhost:4200/login');
  
  const loadTime = Date.now() - startTime;
  
  // Verificar que la página carga en menos de 3 segundos
  expect(loadTime).toBeLessThan(3000);
  
  // Verificar que los elementos críticos están presentes y visibles
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  
  await expect(emailInput).toBeVisible({ timeout: 2000 });
  await expect(passwordInput).toBeVisible({ timeout: 2000 });
});
