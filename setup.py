#!/usr/bin/env python3

from setuptools import setup
from Cython.build import cythonize

setup(
    name='Subtitle Generator',
    ext_modules=cythonize('./src/**/*.pyx'),
    zip_safe=False
)
