# Darient App

Aplicación móvil construida con Expo (React Native) que muestra chistes de Chuck Norris, permite buscar, consultar detalles y gestionar favoritos con autenticación basada en Supabase. El proyecto sigue una arquitectura MVVM con estado global en Zustand.

- Node: 18.18.x
- Expo SDK: 53.0.20
- React Native: 0.79.5
- TypeScript: ~5.8
- Navegación: React Navigation + Expo Router (entry)
- UI: react-native-paper
- Estado: Zustand
- Backend: Supabase (Auth + APIs)
- Almacenamiento: AsyncStorage (sesión de Supabase)
- Conectividad: @react-native-community/netinfo
- Notificaciones locales: expo-notifications

---

## Arquitectura (MVVM)

La app utiliza MVVM para separar responsabilidades:

- **Model**: Tipos e interfaces en `app/helper/` (p. ej. `Joke`, `Favorite`, `User`).
- **View**: Pantallas en `app/Screens/` y componentes reutilizables en `components/`.
- **ViewModel**: Orquestadores por caso de uso en `app/ModelViewModels/` (consumen servicios y actualizan Stores).
- **Services**: Acceso a datos en `app/services/` (Supabase / APIs externas).
- **Store (Estado)**: Slices de Zustand en `app/Store/` (fuente única de verdad para la View).

Flujo típico:
1. La View (pantalla) invoca un método del ViewModel.
2. El ViewModel llama a un Service.
3. El Service devuelve datos; el ViewModel los transforma si es necesario y actualiza el Store.
4. La View se actualiza automáticamente al consumir el Store.

---

## Estructura de carpetas

### `app/`
- `index.tsx`: punto de entrada de la app; monta `InitialStack`.
- `+not-found.tsx`: pantalla 404 de expo-router.
- `(tabs)/`: archivos de ejemplo/soporte para el sistema de rutas basado en archivos.
- `StackScreen/`
  - `InitialStack/`: decide si renderiza tabs (`TabBottoms`) o flujo de registro/login según `useAuthStore`.
  - `HomeStack/`: navegación para Home y Details.
  - `SignUpStack/`: flujo de registro/login.
- `TabBottoms/`
  - `index.tsx`: bottom tabs con Home, Favorites y Search.
- `Screens/`
  - `Home/`: lista de categorías y navegación a chistes por categoría.
  - `Details/`: detalle de un chiste.
  - `Favorites/`: lista de favoritos del usuario autenticado.
  - `Search/`: búsqueda de chistes con `Searchbar` y `FlatList`.
  - `Login/`, `Register/`: autenticación de usuario.
- `ModelViewModels/`
  - `HomeViewModel/`, `JokeViewModel/`, `SearchViewModel/`, `FavoriteViewModel/`, `SignOutViewModel/`.
  - Encapsulan lógica de caso de uso: cargan datos vía `services` y actualizan `Store`.
- `services/`
  - `ServiceJoke/`, `ServiceCategories/`, `ServiceFavorite/`, `ServiceSignOut/`.
  - Capa de acceso a datos/servidor (Supabase u otras APIs).
- `Store/` (Zustand)
  - `Auth/`: sesión de usuario; persiste con `AsyncStorage` (para Supabase).
  - `Categories/`, `Joke/`, `JokeSearch/`, `Favorites/`, `Offline/`.
  - Cada slice maneja su propio `loading` y datos de dominio.
- `helper/`
  - Interfaces de datos: `Joke`, `Favorite`, `SearchJokeResponse`, `JokeRandomResponse`, `User`, etc.

### `components/`
- `ConnectivityToast/`: Snackbar global que muestra “No internet connection” utilizando NetInfo y `Portal` de react-native-paper; actualiza `app/Store/Offline/`.
- `ListResultSearch/`: `FlatList` reutilizable para resultados de búsqueda.
- `ListFavorites/`, `ListCategories/`, `Joke/`.
- Accesorios UI: `FavoriteHeart/`, `FavoriteTrash/`, `FormValidate/`, `ui/` y componentes de ejemplo (`ThemedText`, `ThemedView`, etc.).

### `lib/`
- `supabase.ts`: cliente Supabase configurado con `AsyncStorage` para persistir sesión.
  ```ts
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
  ```
- `notification.ts`: inicialización mínima de permisos y handler de `expo-notifications`.

---

## Módulos clave

### Autenticación (Supabase)
- `app/Store/Auth/index.tsx`:
  - `validateUser()`: lee `user` desde `AsyncStorage` y actualiza el estado.
  - `successfullLogin(user)`: persiste `user` en `AsyncStorage` y lo guarda en el store.
- `app/StackScreen/InitialStack`: muestra `TabBottoms` si `user` existe; de lo contrario `SignUpStack`.

### Favoritos
- `app/Store/Favorites`: estado básico con `favorites`, `loading`, `setFavorites`, `setLoading`.
- `app/ModelViewModels/FavoriteViewModel`:
  - `getAllFavorites(user)`: carga desde el servicio y marca cada resultado como `isFavorite: true`.
  - `removeAFavorite(joke, user)`: elimina en backend y sincroniza el store.
- `components/ListFavorites`: pinta tarjetas con opción de eliminación (`FavoriteTrash`).

### Búsqueda de chistes
- `app/Store/JokeSearch`: maneja `search`, `resultSearch`, `loading`.
- `app/ModelViewModels/SearchViewModel`: orquesta búsqueda y actualiza el store.
- `components/ListResultSearch`:
  - Usa `FlatList` con `contentContainerStyle={{ paddingBottom: 75 }}` y `style={{ flex: 1 }}` para un scroll correcto.

### Conectividad (offline)
- `components/ConnectivityToast`:
  - Suscripción global a NetInfo.
  - Muestra `Snackbar` si no hay internet.
  - Actualiza `app/Store/Offline` para que otras partes de la app puedan reaccionar si se requiere.

### Notificaciones locales
- `lib/notification.ts`:
  - `initializeNotification()`: solicita permisos y define handler de foreground. Para programar notificaciones, puedes usar directamente `Notifications.scheduleNotificationAsync(...)` donde lo necesites o crear un helper adicional (p. ej. `notifyNow`, `notifyIn`).

---

## Navegación

- Tabs principales en `TabBottoms`: Home, Favorites, Search.
- Pila `HomeStack`: `Home` → `Details`.
- `InitialStack` decide Tabs vs. SignUp según `useAuthStore`.
- La app usa `expo-router` como entry (`"main": "expo-router/entry"`), pero la navegación se implementa con React Navigation (compatibles).

---

## UI y theming

- Se utilizan componentes de `react-native-paper` (Searchbar, ActivityIndicator, Card, Snackbar).
- `Portal` + `Snackbar` para toasts globales.
- `SafeAreaView` para respetar las áreas seguras.

Opcional: envolver la app en `PaperProvider` en `app/index.tsx` si quieres theming global.

---

## Variables de entorno

`lib/supabase.ts` requiere:
- `EXPO_PUBLIC_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Defínelas en tu entorno de shell antes de iniciar el proyecto (Expo soporta `EXPO_PUBLIC_*`):
```bash
export EXPO_PUBLIC_URL="https://<tu-proyecto>.supabase.co"
export EXPO_PUBLIC_SUPABASE_ANON_KEY="<tu-anon-key>"
```

O configúralas en tus perfiles de ejecución (bash/zsh) o CI.

---

## Dependencias principales (`package.json`)

- Expo 53 (`"expo": "~53.0.20"`)
- React 19 / React Native 0.79
- `@react-native-async-storage/async-storage` (persistencia de sesión Supabase).
- `@react-native-community/netinfo` (estado de red).
- `expo-notifications` (notificaciones locales).
- `react-native-paper` (UI).
- `zustand` (estado).
- React Navigation (`@react-navigation/*`).

Scripts útiles:
- `npm run start` — levanta Metro bundler
- `npm run ios` — build/run dev client iOS (requiere Xcode)
- `npm run android` — build/run dev client Android (requiere Android Studio)
- `npm run web` — inicia en navegador
- `npm run startios` — alias para `npx expo run:ios`
- `npm run reset-project` — limpia proyecto de ejemplo de Expo

---

## Pasos para correr el proyecto

1. Requisitos
   - Node v18.18.x
   - Xcode 16.2 (macOS) y/o Android Studio (según plataforma) , `No usar la version ios 18.4 en el emulador, muestra error con supabase ,solo la version ios 18.3`
   - CocoaPods instalado (iOS): `sudo gem install cocoapods`

2. Instalar dependencias
   ```bash
   npm install
   ```

3. Configurar variables de entorno (Supabase)
   ```bash
   export EXPO_PUBLIC_URL="https://<tu-proyecto>.supabase.co"
   export EXPO_PUBLIC_SUPABASE_ANON_KEY="<tu-anon-key>"
   ```

4. iOS: instalar Pods
   ```bash
   npx pod-install
   ```

5. Iniciar el proyecto
   - Desarrollo general:
     ```bash
     npm run start
     ```
   - iOS (dev client):
     ```bash
     npm run ios
     ```
   - Android (dev client):
     ```bash
     npm run android
     ```

   Nota: Dado el uso de módulos nativos (`expo-notifications`, `@react-native-async-storage/async-storage`, NetInfo), se recomienda usar un Development Build (dev client) con `expo run:ios` / `expo run:android`.

6. Probar funcionalidades clave
   - Autenticación: registro/login → `InitialStack` debería llevarte a Tabs al autenticarse.
   - Búsqueda: escribe en Search; la `FlatList` mostrará resultados.
   - Favoritos: visualizar y eliminar; lista se actualiza.
   - Conectividad: desactiva internet; se mostrará Snackbar “No internet connection”.
   - Notificaciones locales: invoca `initializeNotification()` y programa una notificación en el lugar deseado.

---
## Pruebas 
<img width="1206" height="2622" alt="offlineFavorites" src="https://github.com/user-attachments/assets/d1467010-9976-40ed-87bb-5d31d8f8affc" />
<img width="1206" height="2622" alt="NotificationLogin" src="https://github.com/user-attachments/assets/a9f8304e-4cf6-480d-97e4-df392ddda624" />
<img width="1206" height="2622" alt="NoConecction" src="https://github.com/user-attachments/assets/2a214860-692a-4351-a8bc-e63d9994944d" />
  <img width="602" height="1255" alt="Agregar Favorito" src="https://github.com/user-attachments/assets/13557a98-7c77-41eb-9198-3a7fdae3cdea" />

<img width="379" height="766" alt="NotificationAndroid" src="https://github.com/user-attachments/assets/675d9c55-9315-4741-82e4-b49b89371e6b" />
<img width="602" height="1322" alt="Register" src="https://github.com/user-attachments/assets/cf5b7447-5949-44ef-a709-41060be51eca" />
<img width="602" height="1299" alt="Login" src="https://github.com/user-attachments/assets/614f715b-58e5-4616-9eb1-6f755880c65c" />
<img width="597" height="1255" alt="Search" src="https://github.com/user-attachments/assets/a6b2e0c3-609b-45df-b9b8-b091f1a66475" />
<img width="600" height="1287" alt="ListaDeFavorites" src="https://github.com/user-attachments/assets/b205b888-2a70-4e93-a4d1-b658ea2cccaa" />

## Notas y buenas prácticas

- MVVM: mantén la lógica de negocio en ViewModels y la comunicación de datos en Stores. Las Views deben permanecer delgadas.
- Estado: evita mutaciones directas; usa acciones de los Stores.
- UI: si necesitas Portal/tema global, monta `PaperProvider` en `app/index.tsx`.
- Rendimiento: en listas grandes, ajusta `keyExtractor` con IDs reales y considera `getItemLayout` si los ítems tienen altura fija.
- Errores/red: `Store/Offline` está disponible para reaccionar en casos sin conectividad.

---

## Roadmap (sugerencias)

- Persistencia local de favoritos (AsyncStorage) con sincronización remoto/local.
- Tests unitarios de ViewModels y Stores.
- Theming global con `PaperProvider`.
- Manejo unificado de errores (toasts globales).
