import unittest
import sys
import os

# Agregar el directorio src al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from automation import WebAutomationFramework
import config

class TestWebAutomation(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Configuración inicial para todos los tests"""
        print("\n🧪 Iniciando tests de automatización...")
        cls.bot = WebAutomationFramework(headless=True, timeout=10)
    
    @classmethod
    def tearDownClass(cls):
        """Limpieza después de todos los tests"""
        cls.bot.close_browser()
        print("🧪 Tests completados")
    
    def test_navigation(self):
        """Test de navegación básica"""
        print("🧪 Test: Navegación")
        result = self.bot.navigate_to(config.URLS['google'])
        self.assertTrue(result, "Debería poder navegar a Google")
        
        title = self.bot.get_page_title()
        self.assertIsNotNone(title, "Debería obtener el título de la página")
        self.assertIn("Google", title, "El título debería contener 'Google'")
    
    def test_element_finding(self):
        """Test de búsqueda de elementos"""
        print("🧪 Test: Búsqueda de elementos")
        self.bot.navigate_to(config.URLS['google'])
        
        # Buscar el campo de búsqueda
        search_box = self.bot.find_element(config.SELECTORS['google_search_box'], by="name")
        self.assertIsNotNone(search_box, "Debería encontrar el campo de búsqueda")
    
    def test_text_input(self):
        """Test de entrada de texto"""
        print("🧪 Test: Entrada de texto")
        self.bot.navigate_to(config.URLS['google'])
        
        # Escribir en el campo de búsqueda
        result = self.bot.type_text(config.SELECTORS['google_search_box'], 
                                   config.TEST_DATA['search_terms'][0], 
                                   by="name")
        self.assertTrue(result, "Debería poder escribir texto en el campo de búsqueda")
    
    def test_screenshot(self):
        """Test de captura de pantalla"""
        print("🧪 Test: Screenshot")
        self.bot.navigate_to(config.URLS['google'])
        
        filename = self.bot.take_screenshot("tests/test_screenshot.png")
        self.assertIsNotNone(filename, "Debería poder tomar screenshot")
        if filename:  # Verificar que filename no sea None
            self.assertTrue(os.path.exists(filename), "El archivo de screenshot debería existir")

class TestDataProcessing(unittest.TestCase):
    """Tests para procesamiento de datos"""
    
    def setUp(self):
        """Configuración para cada test"""
        self.bot = WebAutomationFramework(headless=True, timeout=5)
    
    def tearDown(self):
        """Limpieza después de cada test"""
        self.bot.close_browser()
    
    def test_json_save(self):
        """Test de guardado en JSON"""
        print("🧪 Test: Guardado JSON")
        test_data = [
            {'nombre': 'Test 1', 'valor': 100},
            {'nombre': 'Test 2', 'valor': 200}
        ]
        
        filename = self.bot.save_data_to_json(test_data, "tests/test_data.json")
        self.assertIsNotNone(filename, "Debería poder guardar datos en JSON")
        if filename:  # Verificar que filename no sea None
            self.assertTrue(os.path.exists(filename), "El archivo JSON debería existir")
    
    def test_csv_save(self):
        """Test de guardado en CSV"""
        print("🧪 Test: Guardado CSV")
        test_data = [
            ['Test 1', 100],
            ['Test 2', 200]
        ]
        headers = ['nombre', 'valor']
        
        filename = self.bot.save_data_to_csv(test_data, "tests/test_data.csv", headers)
        self.assertIsNotNone(filename, "Debería poder guardar datos en CSV")
        if filename:  # Verificar que filename no sea None
            self.assertTrue(os.path.exists(filename), "El archivo CSV debería existir")

if __name__ == '__main__':
    # Crear directorio de tests si no existe
    if not os.path.exists('tests'):
        os.makedirs('tests')
    
    # Ejecutar tests con verbosidad
    unittest.main(verbosity=2)