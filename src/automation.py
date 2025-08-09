from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import time
import json
import csv
from datetime import datetime
import os

class WebAutomationFramework:
    def __init__(self, headless=False, timeout=10):
        """
        Inicializar el framework de automatización
        
        Args:
            headless (bool): Ejecutar sin interfaz gráfica
            timeout (int): Tiempo de espera por defecto
        """
        self.timeout = timeout
        self.setup_driver(headless)
        self.wait = WebDriverWait(self.driver, timeout) # pyright: ignore[reportAttributeAccessIssue]
        self.actions = ActionChains(self.driver)
        
        # Crear carpetas para resultados
        self.create_directories()
        
    def setup_driver(self, headless):
        """Configurar el driver de Chrome"""
        chrome_options = webdriver.ChromeOptions()
        
        if headless:
            chrome_options.add_argument("--headless")
            
        # Opciones adicionales para mejor rendimiento
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        # Configurar el servicio del driver
        service = Service(ChromeDriverManager().install())
        
        try:
            self.driver = webdriver.Chrome(service=service, options=chrome_options)
            print("✅ Driver de Chrome inicializado correctamente")
        except Exception as e:
            print(f"❌ Error al inicializar driver: {e}")
            raise
            
    def create_directories(self):
        """Crear directorios necesarios para guardar resultados"""
        directories = ['screenshots', 'reports', 'data']
        for directory in directories:
            if not os.path.exists(directory):
                os.makedirs(directory)
                print(f"📁 Directorio '{directory}' creado")

    # ===========================================
    # MÉTODOS DE NAVEGACIÓN
    # ===========================================
    
    def navigate_to(self, url):
        """Navegar a una URL"""
        try:
            self.driver.get(url)
            print(f"🌐 Navegando a: {url}")
            return True
        except Exception as e:
            print(f"❌ Error al navegar a {url}: {e}")
            return False
    
    def go_back(self):
        """Ir hacia atrás en el historial"""
        self.driver.back()
        print("⬅️ Navegando hacia atrás")
    
    def refresh_page(self):
        """Refrescar la página"""
        self.driver.refresh()
        print("🔄 Página refrescada")

    # ===========================================
    # MÉTODOS DE BÚSQUEDA DE ELEMENTOS
    # ===========================================
    
    def find_element(self, selector, by=By.ID, timeout=None):
        """Buscar un elemento con timeout personalizable"""
        wait_time = timeout or self.timeout
        wait = WebDriverWait(self.driver, wait_time)
        
        try:
            element = wait.until(EC.presence_of_element_located((by, selector)))
            return element
        except TimeoutException:
            print(f"⏰ Elemento '{selector}' no encontrado en {wait_time} segundos")
            return None
    
    def find_elements(self, selector, by=By.ID):
        """Buscar múltiples elementos"""
        try:
            elements = self.driver.find_elements(by, selector)
            print(f"🔍 Encontrados {len(elements)} elementos con selector '{selector}'")
            return elements
        except Exception as e:
            print(f"❌ Error al buscar elementos: {e}")
            return []
    
    def wait_for_element_clickable(self, selector, by=By.ID, timeout=None):
        """Esperar hasta que un elemento sea clickeable"""
        wait_time = timeout or self.timeout
        wait = WebDriverWait(self.driver, wait_time)
        
        try:
            element = wait.until(EC.element_to_be_clickable((by, selector)))
            return element
        except TimeoutException:
            print(f"⏰ Elemento '{selector}' no es clickeable después de {wait_time} segundos")
            return None

    # ===========================================
    # MÉTODOS DE INTERACCIÓN
    # ===========================================
    
    def click_element(self, selector, by=By.ID, timeout=None):
        """Hacer clic en un elemento con verificaciones"""
        element = self.wait_for_element_clickable(selector, by, timeout)
        if element:
            try:
                element.click()
                print(f"✅ Clic realizado en: {selector}")
                return True
            except Exception as e:
                print(f"❌ Error al hacer clic: {e}")
                return False
        return False
    
    def type_text(self, selector, text, by=By.ID, clear_first=True):
        """Escribir texto en un campo"""
        element = self.find_element(selector, by)
        if element:
            try:
                if clear_first:
                    element.clear()
                element.send_keys(text)
                print(f"✍️ Texto '{text}' escrito en: {selector}")
                return True
            except Exception as e:
                print(f"❌ Error al escribir texto: {e}")
                return False
        return False
    
    def press_key(self, selector, key, by=By.ID):
        """Presionar una tecla específica en un elemento"""
        element = self.find_element(selector, by)
        if element:
            try:
                element.send_keys(key)
                print(f"⌨️ Tecla presionada en {selector}")
                return True
            except Exception as e:
                print(f"❌ Error al presionar tecla: {e}")
                return False
        return False
    
    def select_dropdown_by_text(self, selector, text, by=By.ID):
        """Seleccionar opción de dropdown por texto"""
        from selenium.webdriver.support.ui import Select
        element = self.find_element(selector, by)
        if element:
            try:
                select = Select(element)
                select.select_by_visible_text(text)
                print(f"📋 Seleccionado '{text}' en dropdown: {selector}")
                return True
            except Exception as e:
                print(f"❌ Error al seleccionar dropdown: {e}")
                return False
        return False

    # ===========================================
    # MÉTODOS DE OBTENCIÓN DE DATOS
    # ===========================================
    
    def get_text(self, selector, by=By.ID):
        """Obtener texto de un elemento"""
        element = self.find_element(selector, by)
        if element:
            try:
                text = element.text
                print(f"📖 Texto obtenido de {selector}: '{text}'")
                return text
            except Exception as e:
                print(f"❌ Error al obtener texto: {e}")
                return None
        return None
    
    def get_attribute(self, selector, attribute, by=By.ID):
        """Obtener atributo de un elemento"""
        element = self.find_element(selector, by)
        if element:
            try:
                value = element.get_attribute(attribute)
                print(f"🏷️ Atributo '{attribute}' de {selector}: '{value}'")
                return value
            except Exception as e:
                print(f"❌ Error al obtener atributo: {e}")
                return None
        return None
    
    def get_page_title(self):
        """Obtener título de la página"""
        title = self.driver.title
        print(f"📄 Título de la página: '{title}'")
        return title
    
    def get_current_url(self):
        """Obtener URL actual"""
        url = self.driver.current_url
        print(f"🔗 URL actual: {url}")
        return url

    # ===========================================
    # MÉTODOS DE UTILIDAD
    # ===========================================
    
    def take_screenshot(self, filename=None):
        """Tomar captura de pantalla"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"screenshots/screenshot_{timestamp}.png"
        
        try:
            self.driver.save_screenshot(filename)
            print(f"📸 Screenshot guardado: {filename}")
            return filename
        except Exception as e:
            print(f"❌ Error al tomar screenshot: {e}")
            return None
    
    def scroll_to_element(self, selector, by=By.ID):
        """Hacer scroll hasta un elemento"""
        element = self.find_element(selector, by)
        if element:
            try:
                self.driver.execute_script("arguments[0].scrollIntoView();", element)
                print(f"📜 Scroll realizado hasta: {selector}")
                return True
            except Exception as e:
                print(f"❌ Error al hacer scroll: {e}")
                return False
        return False
    
    def wait(self, seconds):
        """Esperar un tiempo específico"""
        print(f"⏱️ Esperando {seconds} segundos...")
        time.sleep(seconds)
    
    def switch_to_frame(self, frame_selector, by=By.ID):
        """Cambiar a un iframe"""
        frame = self.find_element(frame_selector, by)
        if frame:
            try:
                self.driver.switch_to.frame(frame)
                print(f"🔄 Cambiado a frame: {frame_selector}")
                return True
            except Exception as e:
                print(f"❌ Error al cambiar a frame: {e}")
                return False
        return False
    
    def switch_to_default_content(self):
        """Volver al contenido principal"""
        self.driver.switch_to.default_content()
        print("🔄 Vuelto al contenido principal")

    # ===========================================
    # MÉTODOS DE GUARDADO DE DATOS
    # ===========================================
    
    def save_data_to_json(self, data, filename=None):
        """Guardar datos en formato JSON"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"data/data_{timestamp}.json"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"💾 Datos guardados en: {filename}")
            return filename
        except Exception as e:
            print(f"❌ Error al guardar JSON: {e}")
            return None
    
    def save_data_to_csv(self, data, filename=None, headers=None):
        """Guardar datos en formato CSV"""
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"data/data_{timestamp}.csv"
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                if headers:
                    writer.writerow(headers)
                for row in data:
                    writer.writerow(row)
            print(f"💾 Datos guardados en: {filename}")
            return filename
        except Exception as e:
            print(f"❌ Error al guardar CSV: {e}")
            return None

    # ===========================================
    # MÉTODO DE CIERRE
    # ===========================================
    
    def close_browser(self):
        """Cerrar el navegador"""
        try:
            self.driver.quit()
            print("🚪 Navegador cerrado correctamente")
        except Exception as e:
            print(f"❌ Error al cerrar navegador: {e}")

# ===========================================
# EJEMPLO DE USO
# ===========================================

def ejemplo_automatizacion():
    """Ejemplo básico de uso del framework"""
    
    # Inicializar el framework
    bot = WebAutomationFramework(headless=False, timeout=15)
    
    try:
        # Ejemplo 1: Buscar en Google
        print("\n🚀 Iniciando ejemplo de automatización...")
        
        bot.navigate_to("https://www.google.com")
        bot.wait(2)
        
        # Buscar algo en Google
        bot.type_text("q", "Selenium Python automation", By.NAME)
        bot.press_key("q", Keys.RETURN, By.NAME)
        bot.wait(3)
        
        # Obtener título y tomar screenshot
        title = bot.get_page_title()
        screenshot = bot.take_screenshot()
        
        # Obtener algunos resultados
        resultados = []
        links = bot.find_elements("h3", By.TAG_NAME)
        
        for i, link in enumerate(links[:5]):  # Primeros 5 resultados
            texto = link.text
            if texto:
                resultados.append({
                    'posicion': i + 1,
                    'titulo': texto,
                    'timestamp': datetime.now().isoformat()
                })
        
        # Guardar datos
        if resultados:
            bot.save_data_to_json(resultados, "data/resultados_google.json")
            headers = ['posicion', 'titulo', 'timestamp']
            csv_data = [[r['posicion'], r['titulo'], r['timestamp']] for r in resultados]
            bot.save_data_to_csv(csv_data, "data/resultados_google.csv", headers)
        
        print(f"✅ Automatización completada exitosamente!")
        print(f"📊 Se encontraron {len(resultados)} resultados")
        
    except Exception as e:
        print(f"❌ Error en la automatización: {e}")
        bot.take_screenshot("screenshots/error_screenshot.png")
    
    finally:
        bot.close_browser()

if __name__ == "__main__":
    ejemplo_automatizacion()