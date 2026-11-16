import { test, expect } from '@playwright/test'

const LIVE_URL = 'https://buy.stripe.com/5kQaEW5Xs96Kc0p2lUdnW33'
const TELEGRAM_URL = 'https://t.me/+7JPGanj9QfpjYWI0'

test('сайт открывается без ошибок в консоли', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto('/')
  await expect(page).toHaveTitle(/Booty Mamy/i)
  await expect(page.getByRole('link', { name: 'Купить' })).toBeAttached()
  expect(errors).toEqual([])
})

test('все кнопки оплаты ведут на боевую ссылку Stripe', async ({ page }) => {
  await page.goto('/')
  const links = page.locator('a[href*="buy.stripe.com"]')
  await expect(links).toHaveCount(2)
  for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
    expect(href).toBe(LIVE_URL)
  }
  await expect(page.getByRole('link', { name: 'Купить' })).toHaveAttribute('href', LIVE_URL)
  await expect(page.getByRole('link', { name: 'Записаться на курс' })).toHaveAttribute('href', LIVE_URL)
})

test('в коде страницы нет тестовых ссылок Stripe', async ({ page }) => {
  await page.goto('/')
  const html = await page.content()
  expect(html).not.toContain('buy.stripe.com/test_')
})

test('«Купить» открывает боевую оплату «Мини комплексы» 990 CZK', async ({ page }) => {
  await page.goto('/')
  const buy = page.getByRole('link', { name: 'Купить' })
  await buy.scrollIntoViewIfNeeded()
  await buy.click()
  await page.waitForURL(/buy\.stripe\.com/)
  await expect(page.getByText(/Мини комплексы/).first()).toBeVisible({ timeout: 20_000 })
  await expect(page.getByText(/990/).first()).toBeVisible()
  await expect(page.getByText(/Тестовая среда|Test mode|Sandbox/i)).toHaveCount(0)
})

test('ссылка на Telegram-группу доступна', async ({ request }) => {
  const res = await request.get(TELEGRAM_URL)
  expect(res.ok()).toBeTruthy()
  expect(await res.text()).toContain('Плоский живот')
})
