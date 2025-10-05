from Decorator import Window, BorderDecorator, VerticalSBDecorator, HorizontalSBDecorator

# Build a window
w = Window()
w.build()

# Add a border to the window before building a window
wb = BorderDecorator(w)
wb.build()

# Add a vertical scroll, then border before building a window
wbv = VerticalSBDecorator(wb)
wbv.build()

# Add a horizontal scroll, then vertical scroll, then border before building a window
best_window = HorizontalSBDecorator(wbv)
best_window.build()
