﻿namespace CapStoneBackEnd.DTOs.Account
{
    public class LoginRequestDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
