```mermaid
flowchart TD
    A[Start] --> B[Login]
    B --> C{Valid?}
    C -->|Yes| D[Dashboard]
    C -->|No| E[Error]
    E --> B
    D --> F[Logout]
    F --> G[End]
```

dasddas
