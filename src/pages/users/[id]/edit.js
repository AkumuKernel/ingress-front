import React, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Header from '../../../components/Header'

export default function UsersPage() {
  const router = useRouter()
  const { id } = router.query

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!router.isReady) return;

    fetch(
      `http://localhost:3300/api/v1/user/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer $2b$10$JwKI.5.tRAwx5UgVqCuwiufDmkbZSUItIDxWe3YwQQk8.tAG3ULUm'
        }
      }
    )
      .then(response => response.json())
      .then(data => setFormData(data.user))
  }, [router.isReady]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `http://localhost:3300/api/v1/user/${id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $2b$10$JwKI.5.tRAwx5UgVqCuwiufDmkbZSUItIDxWe3YwQQk8.tAG3ULUm'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then(() => {
        router.push(`/users/${formData.id}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          sx={{ mt: 25 }}
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              name="name"
              InputLabelProps={{ shrink: true }}
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>


          <Grid item xs={6}>
            <TextField
              name="lastName"
              InputLabelProps={{ shrink: true }}
              label="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="rut"
              InputLabelProps={{ shrink: true }}
              label="RUT"
              value={formData.rut}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="email"
              InputLabelProps={{ shrink: true }}
              label="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="phone"
              InputLabelProps={{ shrink: true }}
              label="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>

        </Grid>
      </form>
    </>
  )
}
