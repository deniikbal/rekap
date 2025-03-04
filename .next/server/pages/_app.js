/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./contexts/AuthContext.js":
/*!*********************************!*\
  !*** ./contexts/AuthContext.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_supabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/supabase */ \"(pages-dir-node)/./lib/supabase.js\");\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            // Check active session when the component is mounted\n            const checkSession = {\n                \"AuthProvider.useEffect.checkSession\": async ()=>{\n                    const { data: { session } } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.getSession();\n                    setUser(session?.user || null);\n                    setLoading(false);\n                    // Set up auth state listener\n                    const { data: { subscription } } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.onAuthStateChange({\n                        \"AuthProvider.useEffect.checkSession\": (_event, session)=>{\n                            setUser(session?.user || null);\n                        }\n                    }[\"AuthProvider.useEffect.checkSession\"]);\n                    return ({\n                        \"AuthProvider.useEffect.checkSession\": ()=>subscription.unsubscribe()\n                    })[\"AuthProvider.useEffect.checkSession\"];\n                }\n            }[\"AuthProvider.useEffect.checkSession\"];\n            checkSession();\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const login = async (email, password)=>{\n        try {\n            const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.signInWithPassword({\n                email,\n                password\n            });\n            if (error) throw error;\n            return {\n                data,\n                error: null\n            };\n        } catch (error) {\n            return {\n                data: null,\n                error\n            };\n        }\n    };\n    const register = async (email, password, metadata = {})=>{\n        try {\n            const { data, error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.signUp({\n                email,\n                password,\n                options: {\n                    data: metadata\n                }\n            });\n            if (error) throw error;\n            return {\n                data,\n                error: null\n            };\n        } catch (error) {\n            return {\n                data: null,\n                error\n            };\n        }\n    };\n    const logout = async ()=>{\n        try {\n            const { error } = await _lib_supabase__WEBPACK_IMPORTED_MODULE_3__.supabase.auth.signOut();\n            if (error) throw error;\n            router.push('/login');\n        } catch (error) {\n            console.error('Error logging out:', error.message);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            loading,\n            login,\n            register,\n            logout,\n            isAuthenticated: !!user\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\laragon\\\\www\\\\nextjs\\\\contexts\\\\AuthContext.js\",\n        lineNumber: 72,\n        columnNumber: 5\n    }, this);\n}\nfunction useAuth() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error('useAuth must be used within an AuthProvider');\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbnRleHRzL0F1dGhDb250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBdUU7QUFDL0I7QUFDRztBQUUzQyxNQUFNTSw0QkFBY04sb0RBQWFBO0FBRTFCLFNBQVNPLGFBQWEsRUFBRUMsUUFBUSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNTLFNBQVNDLFdBQVcsR0FBR1YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTVcsU0FBU1Qsc0RBQVNBO0lBRXhCRCxnREFBU0E7a0NBQUM7WUFDUixxREFBcUQ7WUFDckQsTUFBTVc7dURBQWU7b0JBQ25CLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsRUFBRSxHQUFHLE1BQU1YLG1EQUFRQSxDQUFDWSxJQUFJLENBQUNDLFVBQVU7b0JBQzVEUixRQUFRTSxTQUFTUCxRQUFRO29CQUN6QkcsV0FBVztvQkFFWCw2QkFBNkI7b0JBQzdCLE1BQU0sRUFBRUcsTUFBTSxFQUFFSSxZQUFZLEVBQUUsRUFBRSxHQUFHLE1BQU1kLG1EQUFRQSxDQUFDWSxJQUFJLENBQUNHLGlCQUFpQjsrREFDdEUsQ0FBQ0MsUUFBUUw7NEJBQ1BOLFFBQVFNLFNBQVNQLFFBQVE7d0JBQzNCOztvQkFHRjsrREFBTyxJQUFNVSxhQUFhRyxXQUFXOztnQkFDdkM7O1lBRUFSO1FBQ0Y7aUNBQUcsRUFBRTtJQUVMLE1BQU1TLFFBQVEsT0FBT0MsT0FBT0M7UUFDMUIsSUFBSTtZQUNGLE1BQU0sRUFBRVYsSUFBSSxFQUFFVyxLQUFLLEVBQUUsR0FBRyxNQUFNckIsbURBQVFBLENBQUNZLElBQUksQ0FBQ1Usa0JBQWtCLENBQUM7Z0JBQzdESDtnQkFDQUM7WUFDRjtZQUVBLElBQUlDLE9BQU8sTUFBTUE7WUFDakIsT0FBTztnQkFBRVg7Z0JBQU1XLE9BQU87WUFBSztRQUM3QixFQUFFLE9BQU9BLE9BQU87WUFDZCxPQUFPO2dCQUFFWCxNQUFNO2dCQUFNVztZQUFNO1FBQzdCO0lBQ0Y7SUFFQSxNQUFNRSxXQUFXLE9BQU9KLE9BQU9DLFVBQVVJLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELElBQUk7WUFDRixNQUFNLEVBQUVkLElBQUksRUFBRVcsS0FBSyxFQUFFLEdBQUcsTUFBTXJCLG1EQUFRQSxDQUFDWSxJQUFJLENBQUNhLE1BQU0sQ0FBQztnQkFDakROO2dCQUNBQztnQkFDQU0sU0FBUztvQkFBRWhCLE1BQU1jO2dCQUFTO1lBQzVCO1lBRUEsSUFBSUgsT0FBTyxNQUFNQTtZQUNqQixPQUFPO2dCQUFFWDtnQkFBTVcsT0FBTztZQUFLO1FBQzdCLEVBQUUsT0FBT0EsT0FBTztZQUNkLE9BQU87Z0JBQUVYLE1BQU07Z0JBQU1XO1lBQU07UUFDN0I7SUFDRjtJQUVBLE1BQU1NLFNBQVM7UUFDYixJQUFJO1lBQ0YsTUFBTSxFQUFFTixLQUFLLEVBQUUsR0FBRyxNQUFNckIsbURBQVFBLENBQUNZLElBQUksQ0FBQ2dCLE9BQU87WUFDN0MsSUFBSVAsT0FBTyxNQUFNQTtZQUNqQmIsT0FBT3FCLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBT1IsT0FBTztZQUNkUyxRQUFRVCxLQUFLLENBQUMsc0JBQXNCQSxNQUFNVSxPQUFPO1FBQ25EO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQzlCLFlBQVkrQixRQUFRO1FBQ25CQyxPQUFPO1lBQ0w3QjtZQUNBRTtZQUNBWTtZQUNBSztZQUNBSTtZQUNBTyxpQkFBaUIsQ0FBQyxDQUFDOUI7UUFDckI7a0JBRUNEOzs7Ozs7QUFHUDtBQUVPLFNBQVNnQztJQUNkLE1BQU1DLFVBQVV4QyxpREFBVUEsQ0FBQ0s7SUFDM0IsSUFBSW1DLFlBQVlDLFdBQVc7UUFDekIsTUFBTSxJQUFJQyxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Y7QUFDVCIsInNvdXJjZXMiOlsiQzpcXGxhcmFnb25cXHd3d1xcbmV4dGpzXFxjb250ZXh0c1xcQXV0aENvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSAnLi4vbGliL3N1cGFiYXNlJztcblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBDaGVjayBhY3RpdmUgc2Vzc2lvbiB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZFxuICAgIGNvbnN0IGNoZWNrU2Vzc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0gfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpO1xuICAgICAgc2V0VXNlcihzZXNzaW9uPy51c2VyIHx8IG51bGwpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG5cbiAgICAgIC8vIFNldCB1cCBhdXRoIHN0YXRlIGxpc3RlbmVyXG4gICAgICBjb25zdCB7IGRhdGE6IHsgc3Vic2NyaXB0aW9uIH0gfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoXG4gICAgICAgIChfZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICAgICAgICBzZXRVc2VyKHNlc3Npb24/LnVzZXIgfHwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuXG4gICAgY2hlY2tTZXNzaW9uKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsb2dpbiA9IGFzeW5jIChlbWFpbCwgcGFzc3dvcmQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduSW5XaXRoUGFzc3dvcmQoe1xuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlZ2lzdGVyID0gYXN5bmMgKGVtYWlsLCBwYXNzd29yZCwgbWV0YWRhdGEgPSB7fSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25VcCh7XG4gICAgICAgIGVtYWlsLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgb3B0aW9uczogeyBkYXRhOiBtZXRhZGF0YSB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5zaWduT3V0KCk7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2dnaW5nIG91dDonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIHVzZXIsXG4gICAgICAgIGxvYWRpbmcsXG4gICAgICAgIGxvZ2luLFxuICAgICAgICByZWdpc3RlcixcbiAgICAgICAgbG9nb3V0LFxuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6ICEhdXNlcixcbiAgICAgIH19XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBdXRoKCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VzZUF1dGggbXVzdCBiZSB1c2VkIHdpdGhpbiBhbiBBdXRoUHJvdmlkZXInKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsInN1cGFiYXNlIiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJyb3V0ZXIiLCJjaGVja1Nlc3Npb24iLCJkYXRhIiwic2Vzc2lvbiIsImF1dGgiLCJnZXRTZXNzaW9uIiwic3Vic2NyaXB0aW9uIiwib25BdXRoU3RhdGVDaGFuZ2UiLCJfZXZlbnQiLCJ1bnN1YnNjcmliZSIsImxvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsImVycm9yIiwic2lnbkluV2l0aFBhc3N3b3JkIiwicmVnaXN0ZXIiLCJtZXRhZGF0YSIsInNpZ25VcCIsIm9wdGlvbnMiLCJsb2dvdXQiLCJzaWduT3V0IiwicHVzaCIsImNvbnNvbGUiLCJtZXNzYWdlIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsImlzQXV0aGVudGljYXRlZCIsInVzZUF1dGgiLCJjb250ZXh0IiwidW5kZWZpbmVkIiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./contexts/AuthContext.js\n");

/***/ }),

/***/ "(pages-dir-node)/./lib/supabase.js":
/*!*************************!*\
  !*** ./lib/supabase.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://vghiuntkpycdcstjrcbe.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaGl1bnRrcHljZGNzdGpyY2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NTMyNzcsImV4cCI6MjA1NjUyOTI3N30.zClSS5E0T2z85zM5Xnt_iWL5T9ltBPljvq81XcwxPl8\";\nif (!supabaseUrl || !supabaseAnonKey) {\n    throw new Error('Missing Supabase environment variables');\n}\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey, {\n    auth: {\n        persistSession: false\n    },\n    db: {\n        schema: 'public'\n    },\n    global: {\n        headers: {\n            'x-application-name': 'nextjs-app'\n        },\n        fetch: fetch.bind(globalThis)\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9zdXBhYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUQ7QUFFckQsTUFBTUMsY0FBY0MsMENBQW9DO0FBQ3hELE1BQU1HLGtCQUFrQkgsa05BQXlDO0FBRWpFLElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxpQkFBaUI7SUFDcEMsTUFBTSxJQUFJRSxNQUFNO0FBQ2xCO0FBRU8sTUFBTUMsV0FBV1IsbUVBQVlBLENBQUNDLGFBQWFJLGlCQUFpQjtJQUNqRUksTUFBTTtRQUNKQyxnQkFBZ0I7SUFDbEI7SUFDQUMsSUFBSTtRQUNGQyxRQUFRO0lBQ1Y7SUFDQUMsUUFBUTtRQUNOQyxTQUFTO1lBQUUsc0JBQXNCO1FBQWE7UUFDOUNDLE9BQU9BLE1BQU1DLElBQUksQ0FBQ0M7SUFDcEI7QUFDRixHQUFHIiwic291cmNlcyI6WyJDOlxcbGFyYWdvblxcd3d3XFxuZXh0anNcXGxpYlxcc3VwYWJhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcclxuXHJcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMO1xyXG5jb25zdCBzdXBhYmFzZUFub25LZXkgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWTtcclxuXHJcbmlmICghc3VwYWJhc2VVcmwgfHwgIXN1cGFiYXNlQW5vbktleSkge1xyXG4gIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBTdXBhYmFzZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXksIHtcclxuICBhdXRoOiB7XHJcbiAgICBwZXJzaXN0U2Vzc2lvbjogZmFsc2VcclxuICB9LFxyXG4gIGRiOiB7XHJcbiAgICBzY2hlbWE6ICdwdWJsaWMnXHJcbiAgfSxcclxuICBnbG9iYWw6IHtcclxuICAgIGhlYWRlcnM6IHsgJ3gtYXBwbGljYXRpb24tbmFtZSc6ICduZXh0anMtYXBwJyB9LFxyXG4gICAgZmV0Y2g6IGZldGNoLmJpbmQoZ2xvYmFsVGhpcylcclxuICB9XHJcbn0pOyJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzdXBhYmFzZUFub25LZXkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsIkVycm9yIiwic3VwYWJhc2UiLCJhdXRoIiwicGVyc2lzdFNlc3Npb24iLCJkYiIsInNjaGVtYSIsImdsb2JhbCIsImhlYWRlcnMiLCJmZXRjaCIsImJpbmQiLCJnbG9iYWxUaGlzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/supabase.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/AuthContext */ \"(pages-dir-node)/./contexts/AuthContext.js\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-toast */ \"react-hot-toast\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_hot_toast__WEBPACK_IMPORTED_MODULE_3__]);\nreact_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\nextjs\\\\pages\\\\_app.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_3__.Toaster, {\n                position: \"top-right\",\n                toastOptions: {\n                    duration: 4000,\n                    success: {\n                        style: {\n                            background: '#10B981',\n                            color: 'white'\n                        }\n                    },\n                    error: {\n                        style: {\n                            background: '#EF4444',\n                            color: 'white'\n                        }\n                    }\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\laragon\\\\www\\\\nextjs\\\\pages\\\\_app.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\laragon\\\\www\\\\nextjs\\\\pages\\\\_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDd0I7QUFDYjtBQUUxQyxTQUFTRSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLHFCQUNFLDhEQUFDSiwrREFBWUE7OzBCQUNYLDhEQUFDRztnQkFBVyxHQUFHQyxTQUFTOzs7Ozs7MEJBQ3hCLDhEQUFDSCxvREFBT0E7Z0JBQ05JLFVBQVM7Z0JBQ1RDLGNBQWM7b0JBQ1pDLFVBQVU7b0JBQ1ZDLFNBQVM7d0JBQ1BDLE9BQU87NEJBQ0xDLFlBQVk7NEJBQ1pDLE9BQU87d0JBQ1Q7b0JBQ0Y7b0JBQ0FDLE9BQU87d0JBQ0xILE9BQU87NEJBQ0xDLFlBQVk7NEJBQ1pDLE9BQU87d0JBQ1Q7b0JBQ0Y7Z0JBQ0Y7Ozs7Ozs7Ozs7OztBQUlSO0FBRUEsaUVBQWVULEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxsYXJhZ29uXFx3d3dcXG5leHRqc1xccGFnZXNcXF9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xuaW1wb3J0IHsgVG9hc3RlciB9IGZyb20gJ3JlYWN0LWhvdC10b2FzdCc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8VG9hc3RlciBcbiAgICAgICAgcG9zaXRpb249XCJ0b3AtcmlnaHRcIlxuICAgICAgICB0b2FzdE9wdGlvbnM9e3tcbiAgICAgICAgICBkdXJhdGlvbjogNDAwMCxcbiAgICAgICAgICBzdWNjZXNzOiB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzEwQjk4MScsXG4gICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0VGNDQ0NCcsXG4gICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L0F1dGhQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7Il0sIm5hbWVzIjpbIkF1dGhQcm92aWRlciIsIlRvYXN0ZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsInBvc2l0aW9uIiwidG9hc3RPcHRpb25zIiwiZHVyYXRpb24iLCJzdWNjZXNzIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-hot-toast":
/*!**********************************!*\
  !*** external "react-hot-toast" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();