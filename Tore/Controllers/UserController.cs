using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tore.Entities;
using Tore.Interfaces;
using Tore.Models;


namespace Tore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }
        [HttpPost("Register")]
        public bool Register([FromBody] User user)
        {
            return _userService.CreateUser(user);

        }
        [HttpGet("GetAllQuestion")]
        public async Task<IActionResult> GetAllQuestion()
        {
            var questions = await _userService.GetAllQuestion();
            return Ok(questions);
        }
        [HttpPost("Question")]
        public bool Question([FromBody] Question question)
        {
            return _userService.CreateQuestion(question);

        }
    }
}