# config.py - Configuración del proyecto

# Configuración del navegador
BROWSER_CONFIG = {
    'headless': False,  # Cambiar a True para ejecutar sin interfaz
    'timeout': 15,
    'window_size': (1920, 1080),
    'implicit_wait': 10
}

# URLs de prueba (cambia por las tuyas)
URLS = {
    'google': 'https://www.google.com',
    'github': 'https://github.com',
    'test_site': 'https://example.com'
}

# Selectores comunes (personaliza según tu proyecto)
SELECTORS = {
    'google_search_box': 'q',
    'google_search_button': "input[value='Buscar con Google']",
    'github_login': 'input[name="login"]',
    'github_password': 'input[name="password"]'
}

# Datos de prueba (NO pongas credenciales reales aquí)
TEST_DATA = {
    'search_terms': ['Selenium automation', 'Python testing', 'Web scraping'],
    'sample_text': 'Texto de prueba para formularios'
}

# Configuración de archivos de salida
OUTPUT_CONFIG = {
    'screenshots_dir': 'screenshots',
    'data_dir': 'data',
    'reports_dir': 'reports',
    'max_screenshots': 50  # Límite de screenshots a guardar
}

# Configuración de delays (tiempos de espera)
DELAYS = {
    'short': 1,
    'medium': 3,
    'long': 5,
    'page_load': 10
}